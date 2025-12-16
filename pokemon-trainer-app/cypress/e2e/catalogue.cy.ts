describe('Catalogue Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/pokemon?limit=*', { fixture: 'pokemon-list.json' }).as('getPokemonList');
    cy.visit('/catalogue');
  });

  it('should display catalogue page', () => {
    cy.contains('Pokémon Catalogue').should('be.visible');
  });

  it('should load and display pokemon list', () => {
    cy.wait('@getPokemonList');
    cy.get('app-pokemon-card').should('have.length.greaterThan', 0);
  });

  it('should display search functionality', () => {
    cy.get('input[placeholder="Search Pokémon..."]').should('be.visible');
  });

  it('should filter pokemon when searching', () => {
    cy.wait('@getPokemonList');
    cy.get('input[placeholder="Search Pokémon..."]').type('pika');
    // Wait a moment for filtering to happen
    cy.wait(500);
    cy.get('app-pokemon-card').should('have.length.lessThan', 4);
  });

  it('should have next button to go to trainer', () => {
    cy.contains('Next →').should('be.visible');
  });

  it('should navigate to trainer when clicking next button', () => {
    cy.contains('Next →').click();
    cy.url().should('include', '/trainer');
  });
});
