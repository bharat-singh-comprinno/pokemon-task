describe('Pokemon Card Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/pokemon/25', { fixture: 'pokemon-detail.json' }).as('getPokemonDetail');
    cy.visit('/catalogue');
    cy.intercept('GET', '**/pokemon?limit=*', { fixture: 'pokemon-list.json' }).as('getPokemonList');
    cy.wait('@getPokemonList');
  });

  it('should display pokemon card', () => {
    cy.get('app-pokemon-card').should('exist');
  });

  it('should display pokemon name with capitalize pipe', () => {
    cy.get('app-pokemon-card').first().should('contain.text', 'Pikachu');
  });

  it('should display pokemon image', () => {
    cy.get('app-pokemon-card img').should('have.attr', 'src');
  });

  it('should have action button', () => {
    cy.get('app-pokemon-card button').should('be.visible');
  });

  it('should emit action when button clicked', () => {
    cy.get('app-pokemon-card').first().find('button').click();
    // Verify the action was performed (e.g., pokemon added to team)
  });
});
