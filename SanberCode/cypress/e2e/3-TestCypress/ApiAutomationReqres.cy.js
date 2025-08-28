// File: cypress/e2e/api/reqres_api.cy.js

// Deskripsi Umum:
// File ini berisi automation testing API menggunakan Cypress
// Target API yang diuji adalah public API "https://reqres.in/"
// Terdapat minimal 15 request untuk menguji berbagai endpoint
// Pengujian mencakup method GET, POST, PUT, PATCH, dan DELETE
// Setiap test case memverifikasi response status code dan isi body (jika relevan)

describe('Automation API Testing Reqres.in', () => {

  // Test Case 01: GET list users (page 1)
  // Tujuan: Memastikan endpoint GET /users?page=1 berhasil mengembalikan data user dengan status 200
  it('TC01 - GET List Users Page 1', () => {
    cy.request('GET', 'https://reqres.in/api/users?page=1').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.not.be.null
    })
  })

  // Test Case 02: GET single user yang ada (id=2)
  // Tujuan: Memastikan endpoint GET /users/2 berhasil mengembalikan user dengan ID 2
  it('TC02 - GET Single User Found', () => {
    cy.request('GET', 'https://reqres.in/api/users/2').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.id).to.eq(2)
    })
  })

  // Test Case 03: GET single user yang tidak ada (id=23)
  // Tujuan: Memastikan endpoint GET /users/23 mengembalikan response 404 karena data tidak ditemukan
  it('TC03 - GET Single User Not Found', () => {
    cy.request({ method: 'GET', url: 'https://reqres.in/api/users/23', failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(404)
      })
  })

  // Test Case 04: POST create user baru
  // Tujuan: Memastikan endpoint POST /users dapat membuat user baru dan mengembalikan status 201
  it('TC04 - POST Create User', () => {
    cy.request('POST', 'https://reqres.in/api/users', {
      name: 'John Doe',
      job: 'QA Engineer'
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.name).to.eq('John Doe')
    })
  })

  // Test Case 05: PUT update user
  // Tujuan: Memastikan endpoint PUT /users/2 berhasil memperbarui data user dengan status 200
  it('TC05 - PUT Update User', () => {
    cy.request('PUT', 'https://reqres.in/api/users/2', {
      name: 'Jane Doe',
      job: 'Software Engineer'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq('Jane Doe')
    })
  })

  // Test Case 06: PATCH update sebagian user
  // Tujuan: Memastikan endpoint PATCH /users/2 berhasil memperbarui sebagian data user dengan status 200
  it('TC06 - PATCH Update User', () => {
    cy.request('PATCH', 'https://reqres.in/api/users/2', {
      job: 'Product Manager'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.job).to.eq('Product Manager')
    })
  })

  // Test Case 07: DELETE user
  // Tujuan: Memastikan endpoint DELETE /users/2 berhasil menghapus user dengan response status 204
  it('TC07 - DELETE User', () => {
    cy.request('DELETE', 'https://reqres.in/api/users/2').then((response) => {
      expect(response.status).to.eq(204)
    })
  })

  // Test Case 08: POST register user valid
  // Tujuan: Memastikan endpoint POST /register dapat mendaftarkan user valid dengan status 200
  it('TC08 - POST Register Successful', () => {
    cy.request('POST', 'https://reqres.in/api/register', {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token')
    })
  })

  // Test Case 09: POST register user gagal (tanpa password)
  // Tujuan: Memastikan endpoint POST /register gagal jika password kosong, dengan status 400
  it('TC09 - POST Register Unsuccessful', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      body: { email: 'sydney@fife' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Missing password')
    })
  })

  // Test Case 10: POST login user valid
  // Tujuan: Memastikan endpoint POST /login berhasil jika email dan password valid
  it('TC10 - POST Login Successful', () => {
    cy.request('POST', 'https://reqres.in/api/login', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token')
    })
  })

  // Test Case 11: POST login user gagal (tanpa password)
  // Tujuan: Memastikan endpoint POST /login gagal jika password kosong, dengan status 400
  it('TC11 - POST Login Unsuccessful', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/login',
      body: { email: 'peter@klaven' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Missing password')
    })
  })

  // Test Case 12: GET list resource
  // Tujuan: Memastikan endpoint GET /unknown mengembalikan daftar resource dengan status 200
  it('TC12 - GET List Resource', () => {
    cy.request('GET', 'https://reqres.in/api/unknown').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.be.an('array')
    })
  })

  // Test Case 13: GET single resource yang ada
  // Tujuan: Memastikan endpoint GET /unknown/2 berhasil mengembalikan resource id=2
  it('TC13 - GET Single Resource Found', () => {
    cy.request('GET', 'https://reqres.in/api/unknown/2').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.id).to.eq(2)
    })
  })

  // Test Case 14: GET single resource tidak ada
  // Tujuan: Memastikan endpoint GET /unknown/23 mengembalikan status 404 jika resource tidak ditemukan
  it('TC14 - GET Single Resource Not Found', () => {
    cy.request({ method: 'GET', url: 'https://reqres.in/api/unknown/23', failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(404)
      })
  })

  // Test Case 15: GET delayed response
  // Tujuan: Memastikan endpoint GET /users?delay=3 memberikan respon setelah delay dengan status 200
  it('TC15 - GET Delayed Response', () => {
    cy.request('GET', 'https://reqres.in/api/users?delay=3').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.not.be.null
    })
  })
})