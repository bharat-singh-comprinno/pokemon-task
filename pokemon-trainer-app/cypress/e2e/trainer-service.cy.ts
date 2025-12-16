describe('Trainer Service Integration', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });

  it('should display empty state when no pokemon in team', () => {
    cy.visit('/trainer');
    cy.contains('No Pokémon selected yet').should('be.visible');
    cy.contains('Go back to catalogue to catch some Pokémon!').should('be.visible');
  });

  it('should display pokemon in team when added', () => {
    const pokemon = { name: 'pikachu', image: 'test.png' };
    
    cy.window().then((win) => {
      win.sessionStorage.setItem('selectedPokemon', JSON.stringify([pokemon]));
    });
    
    cy.visit('/trainer');
    cy.contains('Pikachu').should('be.visible');
    cy.get('img[alt="pikachu"]').should('exist');
  });

  it('should show correct team count', () => {
    const team = [
      { name: 'pikachu', image: 'test1.png' },
      { name: 'charizard', image: 'test2.png' }
    ];
    
    cy.window().then((win) => {
      win.sessionStorage.setItem('selectedPokemon', JSON.stringify(team));
    });
    
    cy.visit('/trainer');
    cy.contains('Your Pokémon Team (2)').should('be.visible');
  });

  it('should remove pokemon from team', () => {
    const pokemon = { name: 'pikachu', image: 'test.png' };
    
    cy.window().then((win) => {
      win.sessionStorage.setItem('selectedPokemon', JSON.stringify([pokemon]));
    });
    
    cy.visit('/trainer');
    cy.contains('Remove').click();
    cy.contains('No Pokémon selected yet').should('be.visible');
  });

  it('should persist team after page reload', () => {
    const pokemon = { name: 'pikachu', image: 'test.png' };
    
    cy.window().then((win) => {
      win.sessionStorage.setItem('selectedPokemon', JSON.stringify([pokemon]));
    });
    
    cy.visit('/trainer');
    cy.reload();
    cy.contains('Pikachu').should('be.visible');
  });

  it('should logout and clear data', () => {
    const pokemon = { name: 'pikachu', image: 'test.png' };
    
    cy.window().then((win) => {
      win.sessionStorage.setItem('selectedPokemon', JSON.stringify([pokemon]));
      win.localStorage.setItem('trainer', 'TestTrainer');
    });
    
    cy.visit('/trainer');
    cy.contains('Logout').click();
    cy.url().should('include', '/landing');
  });
});
