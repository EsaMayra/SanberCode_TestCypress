describe('OrangeHRM Login Feature dengan Intercept', () => {

  // TC01 - Berhasil Login dengan Valid Credentials
  it('TC01 - Berhasil Login dengan Valid Credentials', () => {
    // Action: intercept request login
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');

    // Action: buka halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Assertion: URL login benar
    cy.url().should('include', '/auth/login');

    // Assertion: logo login terlihat
    cy.get('.orangehrm-login-branding > img').should('be.visible');

    // Action: isi username & password
    cy.get("input[placeholder='Username']").type('Admin');
    cy.get("input[placeholder='Password']").type('admin123');

    // Action: klik tombol login
    cy.get("button[type='submit']").click();

    // Assertion: request login sukses (status 200)
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

    // Assertion: redirect ke dashboard
    cy.url().should('include', '/dashboard');

    // Assertion: header dashboard terlihat
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
  });


  // TC02 - Gagal Login dengan Invalid Credentials
  it('TC02 - Gagal Login dengan Invalid Credentials', () => {
    // Action: intercept request login
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');

    // Action: buka halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Action: isi username & password salah
    cy.get("input[placeholder='Username']").type('SalahUser');
    cy.get("input[placeholder='Password']").type('SalahPass');

    // Action: klik tombol login
    cy.get("button[type='submit']").click();

    // Assertion: request login gagal (status 401)
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);

    // Assertion: error message muncul
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });


  // TC03 - Gagal Login dengan Username Kosong
  it('TC03 - Gagal Login dengan Username Kosong', () => {
    // Action: intercept request login
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');

    // Action: buka halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Action: isi hanya password
    cy.get("input[placeholder='Password']").type('admin123');

    // Action: klik tombol login
    cy.get("button[type='submit']").click();

    // Assertion: request login tetap dikirim
    cy.wait('@loginRequest');

    // Assertion: pesan error username kosong muncul
    cy.get('.oxd-input-group > .oxd-text')
      .should('be.visible')
      .and('contain', 'Required');
  });


  // TC04 - Gagal Login dengan Password Kosong
  it('TC04 - Gagal Login dengan Password Kosong', () => {
    // Action: intercept request login
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');

    // Action: buka halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Action: isi hanya username
    cy.get("input[placeholder='Username']").type('Admin');

    // Action: klik tombol login
    cy.get("button[type='submit']").click();

    // Assertion: request login tetap dikirim
    cy.wait('@loginRequest');

    // Assertion: pesan error password kosong muncul
    cy.get('.oxd-input-group > .oxd-text')
      .should('be.visible')
      .and('contain', 'Required');
  });


  // TC05 - Gagal Login dengan Username & Password Kosong
  it('TC05 - Gagal Login dengan Username & Password Kosong', () => {
    // Action: intercept request login
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');

    // Action: buka halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Action: klik tombol login tanpa isi apapun
    cy.get("button[type='submit']").click();

    // Assertion: request login tetap dikirim
    cy.wait('@loginRequest');

    // Assertion: pesan error username kosong
    cy.get('.oxd-input-group > .oxd-text')
      .first()
      .should('contain', 'Required');

    // Assertion: pesan error password kosong
    cy.get('.oxd-input-group > .oxd-text')
      .last()
      .should('contain', 'Required');
  });
});
