describe('Trainer Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.visit('/trainer');
  });

  it('should display trainer page', () => {
    cy.contains('Trainer Profile').should('be.visible');
  });

  it('should display trainer team section', () => {
    cy.contains('Your Pokémon Team').should('be.visible');
  });

  it('should show empty state when no pokemon in team', () => {
    cy.contains('No Pokémon selected yet').should('be.visible');
  });

  it('should display logout button', () => {
    cy.contains('Logout').should('be.visible');
  });

  it('should display pokemon when team has pokemon', () => {
    cy.window().then((win) => {
      win.sessionStorage.setItem('selectedPokemon', JSON.stringify([
        { name: 'pikachu', image: 'test.png' }
      ]));
    });
    cy.reload();
    cy.contains('Pikachu').should('be.visible');
  });

  it('should remove pokemon from team', () => {
    cy.window().then((win) => {
      win.sessionStorage.setItem('selectedPokemon', JSON.stringify([
        { name: 'pikachu', image: 'test.png' }
      ]));
    });
    cy.reload();
    cy.contains('Remove').click();
    cy.contains('No Pokémon selected yet').should('be.visible');
  });

  it('should navigate to landing on logout', () => {
    cy.contains('Logout').click();
    cy.url().should('include', '/landing');
  });
});
