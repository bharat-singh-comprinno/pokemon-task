
describe('Pokemon Service Integration', () => {
  it('should load catalogue page successfully', () => {
    cy.intercept('GET', '**/pokemon?limit=50', { fixture: 'pokemon-list.json' }).as('getPokemonList');
    
    cy.visit('/catalogue');
    cy.wait('@getPokemonList');
    cy.contains('Pokémon Catalogue').should('be.visible');
  });

  it('should display pokemon cards after API call', () => {
    cy.intercept('GET', '**/pokemon?limit=50', { fixture: 'pokemon-list.json' }).as('getPokemonList');
    
    cy.visit('/catalogue');
    cy.wait('@getPokemonList');
    cy.get('app-pokemon-card').should('have.length.greaterThan', 0);
  });




});
