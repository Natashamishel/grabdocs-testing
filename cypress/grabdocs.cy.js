// =============================================
// GrabDocs Cypress Test Suite
// Features: Feedback, Workspace, Forms
// COSC369-400 | Spring 2026
// =============================================

describe('GrabDocs Feature Testing Suite', () => {

  const BASE_URL = 'https://app.grabdocs.com';
  const EMAIL    = 'your-email@example.c';  
  const PASSWORD = 'your-password';           

  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.get('input[type=email]').first().type(EMAIL);
    cy.get('input[type=password]').first().type(PASSWORD);
    cy.get('button[type=submit]').first().click();
    cy.url().should('not.include', '/login');
  });

  // ============================================
  // FEATURE 1: FEEDBACK
  // ============================================
  describe('Feedback Feature', () => {

    it('TC-FB-01: Should display the Feedback section', () => {
      cy.visit(BASE_URL);
      cy.get('[href*=feedback], a').contains(/feedback/i).click();
      cy.url().should('include', '/feedback');
    });

    it('TC-FB-02: Should allow user to submit feedback', () => {
      cy.visit(`${BASE_URL}/feedback`);
      cy.get('textarea, input[placeholder*=feedback i]')
        .first().type('Automated test feedback via Cypress.');
      cy.get('button').contains(/submit|send/i).click();
      cy.contains(/thank you|submitted|success/i).should('be.visible');
    });

    it('TC-FB-03: Should block empty feedback submission', () => {
      cy.visit(`${BASE_URL}/feedback`);
      cy.get('button').contains(/submit|send/i).click();
      cy.get('input:invalid, textarea:invalid, [class*=error]')
        .should('exist');
    });

  });

  // ============================================
  // FEATURE 2: WORKSPACE
  // ============================================
  describe('Workspace Feature', () => {

    it('TC-WS-01: Should navigate to Workspace section', () => {
      cy.visit(`${BASE_URL}/workspaces`);
      cy.url().should('include', '/workspace');
    });

    it('TC-WS-02: Should create a new workspace', () => {
      cy.visit(`${BASE_URL}/workspaces`);
      cy.contains(/new workspace|create|\+ workspace/i).click();
      cy.get('input[type=text]').first().type('Cypress Test Workspace');
      cy.get('button').contains(/create|save/i).click();
      cy.contains('Cypress Test Workspace').should('be.visible');
    });

    it('TC-WS-03: Should list existing workspaces', () => {
      cy.visit(`${BASE_URL}/workspaces`);
      cy.get('[class*=workspace], li, .card')
        .should('have.length.at.least', 1);
    });

    it('TC-WS-04: Should open a workspace', () => {
      cy.visit(`${BASE_URL}/workspaces`);
      cy.get('[class*=workspace], li, .card').first().click();
      cy.url().should('match', /workspace\/[a-zA-Z0-9]/);
    });

  });

  // ============================================
  // FEATURE 3: FORMS
  // ============================================
  describe('Forms Feature', () => {

    it('TC-FM-01: Should navigate to Forms section', () => {
      cy.visit(`${BASE_URL}/forms`);
      cy.url().should('include', '/form');
    });

    it('TC-FM-02: Should create a new form', () => {
      cy.visit(`${BASE_URL}/forms`);
      cy.contains(/new form|create|\+ form/i).click();
      cy.get('input[type=text]').first().type('Cypress Test Form');
      cy.get('button').contains(/create|save|next/i).click();
      cy.contains('Cypress Test Form').should('be.visible');
    });

    it('TC-FM-03: Should add a field to a form', () => {
      cy.visit(`${BASE_URL}/forms`);
      cy.contains('Cypress Test Form').click();
      cy.contains(/add field|\+ field|text/i).click();
      cy.get('input[type=text]').first().type('What is your name?');
      cy.get('button').contains(/save|add|confirm/i).click();
      cy.contains('What is your name?').should('be.visible');
    });

    it('TC-FM-04: Should display list of forms', () => {
      cy.visit(`${BASE_URL}/forms`);
      cy.get('[class*=form], li, .card')
        .should('have.length.at.least', 1);
    });

  });

});