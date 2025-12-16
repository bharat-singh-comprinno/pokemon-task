/// <reference types="cypress" />

describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should redirect to landing page by default', () => {
    cy.url().should('include', '/landing');
  });

  it('should navigate to catalogue page', () => {
    cy.visit('/catalogue');
    cy.url().should('include', '/catalogue');
  });

  it('should navigate to trainer page', () => {
    cy.visit('/trainer');
    cy.url().should('include', '/trainer');
  });

  it('should redirect unknown routes to landing', () => {
    cy.visit('/unknown-route');
    cy.url().should('include', '/landing');
  });
});
