function data() {
    return {
        data: {},
    };
}

// in our test environment, this object will be
// used in place of axios. doing this allows
// us to stub any xhr that our app makes.
export default {
    delete: sinon.stub(),
    get: sinon.stub(),
    patch: sinon.stub(),
    post: sinon.stub(),
    put: sinon.stub(),

    // helper function to reset mocked axios behaviors
    reset() {
        this.delete.reset();
        this.get.reset();
        this.patch.reset();
        this.post.reset();
        this.put.reset();

        // default stub behaviors
        this.delete.resolves(data());
        this.get.resolves(data());
        this.patch.resolves(data());
        this.post.resolves(data());
        this.put.resolves(data());
    },
};
