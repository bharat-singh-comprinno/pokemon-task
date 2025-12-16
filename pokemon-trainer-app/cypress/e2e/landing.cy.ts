/// <reference types="cypress" />

describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/landing');
  });

  it('should display landing page content', () => {
    cy.get('app-landing').should('exist');
  });

  // it('should have navigation links', () => {
  //   cy.contains('Catalogue').should('be.visible');
  //   cy.contains('Trainer').should('be.visible');
  // });

  // it('should navigate to catalogue when clicking catalogue link', () => {
  //   cy.contains('Catalogue').click();
  //   cy.url().should('include', '/catalogue');
  // });

  // it('should navigate to trainer when clicking trainer link', () => {
  //   cy.contains('Trainer').click();
  //   cy.url().should('include', '/trainer');
  // });
});
