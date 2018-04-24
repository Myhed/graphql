const chai = require('chai');
const {expect} = chai;
const {Should} = chai;
const http = require('http');
const rp = require('request-promise');
describe('server',() => {
    let component;
    before(() => {
        component = require('../../lib/graphql');
    });
    it('should start the server',async () => {
        await component.start()
        expect(component.server).to.be.an.instanceof(http.Server);
        expect(component.server).to.have.property("_handle").to.not.be.null
    });
    describe('graphql',() => {
        after(() => {
            describe('quit the server',() => {
                it('should quit the server',async () => {
                    expect(await component.stop()).to.have.property("_handle").to.be.null;
                });
            });
        });
        it('should return hello world', async () => {
            const options = {
                method:"GET",
                uri:`http://localhost:${component.server.address().port}/graphql`,
                qs:{
                    query:"{hello}"
                },
                json:true,
                //resolveWithFullResponse:true
            }
            expect(await rp(options)).to.eql({data:{hello:'Hello world!'}});
        });
    });
});