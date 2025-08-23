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


  // TC03 - Gagal Login dengan Username Kosong
  it('TC03 - Gagal Login dengan Username Kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Action: isi password valid
    cy.get("input[placeholder='Password']").type('admin123');

    // Action: klik tombol login
    cy.get("button[type='submit']").click();

    // Assertion: validasi error karena username kosong
    cy.get('.oxd-input-group > .oxd-text')
      .should('be.visible')
      .and('contain', 'Required');
  });


  // TC04 - Gagal Login dengan Password Kosong
  it('TC04 - Gagal Login dengan Password Kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Action: isi username valid
    cy.get("input[placeholder='Username']").type('Admin');

    // Action: klik tombol login
    cy.get("button[type='submit']").click();

    // Assertion: validasi error karena password kosong
    cy.get('.oxd-input-group > .oxd-text')
      .should('be.visible')
      .and('contain', 'Required');
  });


  // TC05 - Gagal Login dengan Username & Password Kosong
  it('TC05 - Gagal Login dengan Username & Password Kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Action: klik tombol login tanpa isi apapun
    cy.get("button[type='submit']").click();

    // Assertion: validasi error untuk username
    cy.get('.oxd-input-group > .oxd-text')
      .first()
      .should('contain', 'Required');

    // Assertion: validasi error untuk password
    cy.get('.oxd-input-group > .oxd-text')
      .last()
      .should('contain', 'Required');
  });
});
