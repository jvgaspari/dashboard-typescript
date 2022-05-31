/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Add a new employee', () => {

  it('should visit the website', () => {
    cy.visit('http://localhost:3000/pagina-inicial');
  });

  it('should click on employee button', () => {
    cy.get('.MuiList-root > :nth-child(3)').click();
  });

  it('should click on add new employee button', () => {
    cy.get('.MuiButton-root').click();
  });

  it('should fill the name', () => {
    cy.get('#mui-2').type('José Victor Gaspari');
  });

  it('should fill the email', () => {
    cy.get('#mui-3').type('josevictorgaspari@gmail.com');
  });

  it('should select a city', () => {
    cy.get('#mui-5').click();
  });

  it('should select São Paulo city', () => {
    cy.get('#mui-5-option-2').click();
  });

  it('should save', () => {
    cy.get('.MuiButton-contained').click();
  });

  it('should await to save the name', () => {
    cy.wait(1000);
  });

  it('should comeback to employee list page', () => {
    cy.get('.MuiPaper-root > :nth-child(6)').click();
  });

  it('should type the name in searchbar', () => {
    cy.get('#mui-6').type('José Victor');
  });

  it('should check employee name before delete', () => {
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(2)').should('José Victor Gaspari');
  });
});
