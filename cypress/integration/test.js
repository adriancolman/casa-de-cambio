context('exchangeTests', () => {
    before(() => {
        cy.visit("http://192.168.0.48:8080")
    })

    describe("testea un caso correcto", () => {
        it("choose base currency", () => {
            cy.get("#base-select").select("USD")

            cy.get("#base-select").should("have.value", "USD")

        })

        it("select a date", () => {
            cy.get("#date-selection").type("2006-03-22")

            cy.get("#date-selection").should("have.value", "2006-03-22")
        })

        it("check results", () => {
            cy.get("#button-base").click()
            cy.get(".sub-title").should("have.text", "check the rates in USD base at 2006-03-22")
            cy.get(".table-exchange").should("exist")
        })



        it("test table results", () => {

            cy.get(".table-exchange").find(".currency-table-row").its("length").should("be.gt", 10)
            cy.get("#base-select").find("option").its("length").should("be.gt", 10)

            cy.get(".currency-table-row").should("contain.text", "USD")
        })
    })

})