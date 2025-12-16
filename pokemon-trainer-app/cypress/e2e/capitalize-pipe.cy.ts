describe('Capitalize Pipe', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/pokemon?limit=*', { fixture: 'pokemon-list.json' }).as('getPokemonList');
    cy.visit('/catalogue');
    cy.wait('@getPokemonList');
  });

  it('should capitalize pokemon names', () => {
    cy.get('app-pokemon-card').first().should('contain.text', 'Pikachu');
    cy.get('app-pokemon-card').eq(1).should('contain.text', 'Charizard');
    cy.get('app-pokemon-card').eq(2).should('contain.text', 'Blastoise');
  });


});
