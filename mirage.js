import { Server, JSONAPISerializer, Model } from 'miragejs';

// Let's create our makeServer function and export it so we can provide ourselves the opportunity to use Mirage in our UI or any tests your future self may want to write

export function makeServer({ environment = "test" } = {}) {
  /*
    First we'll need to create our server instance using Server from MirageJS

    The MirageJS server intercepts any XMLHttpRequest or fetch requests your Javascript app makes and lets you mock the response.

    We'll want our server to be aware of the environent it's being invoked it and then start definiing what makes up our Server.

    - Something to note about a MirageJS server is that instead of interacting with the data directly, you interface with the ORM layer built on top of where your data is
      stored. 

  */
  let server = new Server({
    environment,

    /*
      Models let our route handlers take advantage of Mirage's in-memory database. The database makes our route handlers dynamic, so we can change the data that's returned
      without having to rewrite the handler. 

    */
    models: {
      user: Model
    },

    /*
      Serializers let you customize the formatting logic of your responses, without having to change your route handlers, models, relationships, or any other part of your
      Mirage setup.

      The JSONAPISerializer is one of the few named serializers shipped with Mirage out of the box. 

      We now have a data shape being returned that will directly mirrror how we'll expect to use it in the UI. 

    */
    serializers: {
      application: JSONAPISerializer,
    },

    /*
      Thankfully creating a seeded database can be extremely easy because of the seeds method.

      If you want to explicitly create the object you'll be interacting with as responses, you can use the server.create function.
      With server.create, you'll want to provide two arguments. 

    */

    seeds(server) {
      server.create("user", { name: "Daniel", email: "daniel@gmail.com", password: "12345", createdAt: new Date() })
      server.create("user", { name: "Julian", email: "julian@gmail.com", password: "12345", createdAt: new Date() })
      server.create("user", { name: "Jimmy", email: "jimmy@gmail.com", password: "12345", createdAt: new Date() })
    },

    routes() {
      this.namespace = "api"

      this.get("/users", schema => schema.users.all())

      this.get("/user/:id", (schema, request) => {
        let id = request.params.id;
        return schema.movies.find(id);
      })

      this.post("/user/create", (schema) => {
        const newUser = request.params.user
        return schema.movies.create(newUser);
      })
    }
  })

  return server;
}