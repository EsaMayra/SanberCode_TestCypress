describe('OrangeHRM Login Feature', () => {

  // TC01 - Berhasil Login dengan Valid Credentials
  it('TC01 - Berhasil Login dengan Valid Credentials', () => {
    // Action: buka halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Assertion: URL login benar
    cy.url().should('include', '/auth/login');

    // Assertion: logo login terlihat
    cy.get('.orangehrm-login-branding > img').should('be.visible');

    // Action: isi username
    cy.get("input[placeholder='Username']").type('Admin');

    // Assertion: username terisi
    cy.get("input[placeholder='Username']").should('have.value', 'Admin');

    // Action: isi password
    cy.get("input[placeholder='Password']").type('admin123');

    // Assertion: password tidak kosong
    cy.get("input[placeholder='Password']").should('not.have.value', '');

    // Action: klik tombol login
    cy.get("button[type='submit']").click();

    // Assertion: redirect ke dashboard
    cy.url().should('include', '/dashboard');

    // Assertion: header dashboard terlihat
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
  });


  // TC02 - Gagal Login dengan Invalid Credentials
  it('TC02 - Gagal Login dengan Invalid Credentials', () => {
    // Action: buka halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Action: isi username salah
    cy.get("input[placeholder='Username']").type('SalahUser');

    // Action: isi password salah
    cy.get("input[placeholder='Password']").type('SalahPass');

    // Action: klik tombol login
    cy.get("button[type='submit']").click();

    // Assertion: error message muncul
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });
});
