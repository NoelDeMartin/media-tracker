import { ILoginInputOptions, ISessionInfo } from '@inrupt/solid-client-authn-browser';
import { Session } from 'solid-auth-client';
import Faker from 'faker';

import emptyTypeIndex from '@tests/fixtures/turtle/emptyTypeIndex.ttl';
import movies from '@tests/fixtures/turtle/movies.ttl';
import populatedTypeIndex from '@tests/fixtures/turtle/populatedTypeIndex.ttl';
import profile from '@tests/fixtures/turtle/profile.ttl';
import taxiDriver from '@tests/fixtures/json/taxi-driver.json';
import taxiDriverTurtle from '@tests/fixtures/turtle/taxi-driver-1976.ttl';

interface LoginContext {
    domain: string;
    signUp?: boolean;
    reload?: () => void;
}

interface SolidAuthClientLoginContext extends LoginContext {
    listener?: Function;
    session?: Session;
}

interface InruptAuthClientLoginContext extends LoginContext {
    oidcIssuer?: string;
    session?: ISessionInfo;
}

function stubSolidPOD(domain: string, signUp: boolean) {
    const typeIndex = signUp ? emptyTypeIndex : populatedTypeIndex;

    cy.fetchRoute('/profile/card#me', profile);
    cy.fetchRoute('/settings/privateTypeIndex.ttl', typeIndex);

    if (signUp) {
        cy.fetchRoute(
            new RegExp(`https://${domain}/$`),
            new Response('Created', { status: 201 }),
        );
    } else {
        cy.fetchRoute('/movies/taxi-driver-1976', taxiDriverTurtle);
        cy.fetchRoute('/movies/', movies);
    }
}

function stubSolidAuthClient(context: SolidAuthClientLoginContext): SolidAuthClientLoginContext {
    context.signUp = context.signUp ?? false;

    cy.lib('solid-auth-client').then(client => {
        cy.stub(client, 'trackSession').callsFake(listener => {
            context.listener = listener;

            if (context.session)
                listener(context.session);
        });
        cy.stub(client, 'login').callsFake(() => {
            context.session = {
                idp: `https://${context.domain}`,
                webId: `https://${context.domain}/profile/card#me`,
                accessToken: 'accessToken',
                idToken: 'idToken',
                clientId: 'clientId',
                sessionKey: 'sessionKey',
            };

            context.listener && context.listener(context.session);

            return context.session;
        });
    });

    stubSolidPOD(context.domain, context.signUp);

    return context;
}

function stubInruptAuthClient(context: InruptAuthClientLoginContext): InruptAuthClientLoginContext {
    context.signUp = context.signUp ?? false;

    cy.lib('@inrupt/solid-client-authn-browser').then(client => {
        cy.stub(client, 'handleIncomingRedirect').callsFake(() => {
            if (!context.oidcIssuer)
                return;

            context.session = {
                isLoggedIn: true,
                sessionId: 'sessionId',
                webId: `https://${context.domain}/profile/card#me`,
            };

            return context.session;
        });
        cy.stub(client, 'login').callsFake(({ oidcIssuer }: ILoginInputOptions) => {
            context.oidcIssuer = oidcIssuer;
        });
    });

    stubSolidPOD(context.domain, context.signUp);

    context.reload =
        () => cy.window()
                .then(window => window.location.reload())
                .then(() => {
                    stubInruptAuthClient(context);

                    cy.startApp();
                });

    return context;
}

describe('Authentication', () => {

    beforeEach(() => cy.visit('/'));

    it('Helps visitors decide what to use', () => {
        // Arrange
        cy.startApp();

        // Act
        cy.contains('Help me decide what to use').click();

        // Assert
        cy.see('If you want to secure your data and access it from other devices, you should use Solid.');
        cy.see(
            'If you only want to try the app or you don\'t want to synchronize with other devices, ' +
            'you should use browser storage.',
        );
    });

    it('Signs up with browser storage', () => {
        // Arrange
        cy.startApp();

        // Act
        cy.contains('Use browser storage').click();

        // Assert
        cy.see('Welcome to Media Kraken!');

        cy.reload();
        cy.see('Welcome to Media Kraken!');
    });

    it('Logs out with browser storage and clears client data', () => {
        // Arrange
        cy.startApp();
        cy.contains('Use browser storage').click();
        cy.see('Welcome to Media Kraken!');

        // Act
        cy.ariaLabel('Application options').click();
        cy.contains('Log out').click();

        // Assert
        cy.indexedDBShouldBeEmpty();
        cy.localStorageShouldBeEmpty();
    });

    it('Logs out in mobile layout', () => {
        // Arrange
        cy.viewport('samsung-s10');
        cy.startApp();
        cy.login();

        // Act
        cy.ariaLabel('Open menu').click();
        cy.contains('Log out').click();

        // Assert
        cy.url().should('include', '/login');
    });

    it('Signs up with Solid', () => {
        // Arrange
        const domain = Faker.internet.domainName();
        const loginContext = stubInruptAuthClient({ domain, signUp: true });

        cy.startApp();

        // Act
        cy.contains('Use Solid').click();
        cy.get('input[placeholder="Solid POD url"]').type(domain);
        cy.contains('Log in with Solid').click();

        // TODO this should be triggered within the stubbed login
        loginContext.reload!();

        // Assert
        cy.see('Welcome to Media Kraken!').then(() => cy.getFetchCalls().then(calls => {
            const typeCalls = calls[`https://${domain}/settings/privateTypeIndex.ttl`];

            expect(typeCalls).to.have.lengthOf(5);

            expect(typeCalls[1].options.method || 'GET').to.eq('GET');
            expect(typeCalls[2].options.method || 'GET').to.eq('GET');
            expect(typeCalls[3].options.method || 'GET').to.eq('PATCH');
            expect(typeCalls[3].options.body).to.contain('<https://schema.org/Movie>');
            expect(typeCalls[4].options.method || 'GET').to.eq('PATCH');
            expect(typeCalls[4].options.body).to.contain('<https://schema.org/WatchAction>');
        }));
    });

    it('Logs in with Solid');
    it('Logs out with Solid and clears client data');

    it('[Legacy] Signs up with Solid', () => {
        // Arrange
        const domain = Faker.internet.domainName();

        stubSolidAuthClient({ domain, signUp: true });

        cy.startApp();

        // Act
        cy.contains('Use Solid').click();
        cy.contains('Can\'t log in? try using a different authentication method').click();
        cy.get('input[placeholder="Solid POD url"]').type(domain);
        cy.get('select').select('Log in using the legacy authentication library');
        cy.get('a[href="https://github.com/solid/solid-auth-client"]').should('be.visible');
        cy.contains('Log in with Solid').click();

        // Assert
        cy.see('Welcome to Media Kraken!').then(() => cy.getFetchCalls().then(calls => {
            const typeCalls = calls[`https://${domain}/settings/privateTypeIndex.ttl`];

            expect(typeCalls).to.have.lengthOf(5);

            expect(typeCalls[1].options.method || 'GET').to.eq('GET');
            expect(typeCalls[2].options.method || 'GET').to.eq('GET');
            expect(typeCalls[3].options.method || 'GET').to.eq('PATCH');
            expect(typeCalls[3].options.body).to.contain('<https://schema.org/Movie>');
            expect(typeCalls[4].options.method || 'GET').to.eq('PATCH');
            expect(typeCalls[4].options.body).to.contain('<https://schema.org/WatchAction>');
        }));
    });

    it('[Legacy] Logs in with Solid', () => {
        // Arrange
        const domain = Faker.internet.domainName();
        const loginContext = stubSolidAuthClient({ domain });

        cy.startApp();

        // Act
        cy.contains('Use Solid').click();
        cy.contains('Can\'t log in? try using a different authentication method').click();
        cy.get('input[placeholder="Solid POD url"]').type(domain);
        cy.get('select').select('Log in using the legacy authentication library');
        cy.contains('Log in with Solid').click();

        // Assert
        cy.seeImage(taxiDriver.image, { timeout: 10000 });

        cy.visit('/collection');
        stubSolidAuthClient(loginContext);
        cy.startApp();
        cy.seeImage(taxiDriver.image, { timeout: 10000 });
    });

    it('[Legacy] Logs out with Solid and clears client data', () => {
        // Arrange
        const domain = Faker.internet.domainName();

        stubSolidAuthClient({ domain });

        cy.startApp();
        cy.contains('Use Solid').click();
        cy.contains('Can\'t log in? try using a different authentication method').click();
        cy.get('input[placeholder="Solid POD url"]').type(domain);
        cy.get('select').select('Log in using the legacy authentication library');
        cy.contains('Log in with Solid').click();
        cy.seeImage(taxiDriver.image, { timeout: 10000 });

        // Act
        cy.ariaLabel('Application options').click();
        cy.contains('Log out').click();

        // Assert
        cy.indexedDBShouldBeEmpty();
        cy.localStorageShouldBeEmpty();
    });

});
