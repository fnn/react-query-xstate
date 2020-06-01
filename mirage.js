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
      Models let our route handlers take advantage of Mirag's in-memory database. The database makes our route handlers dynamic, so we can change the data that's returned
      without having to rewrite the handler. 
      
    */
    models: {
      user: Model
    },

    serializers: {
      application: JSONAPISerializer,
    },

    seeds(server) {
      server.create("user", { name: "Daniel", email: "daniel@gmail.com", password: "12345", createdAt: new Date() })
      server.create("user", { name: "Julian", email: "julian@gmail.com", password: "12345", createdAt: new Date() })
      server.create("user", { name: "Jimmy", email: "jimmy@gmail.com", password: "12345", createdAt: new Date() })
      server.create("user", { name: "Rebecca", email: "rebecca@gmail.com", password: "12345", createdAt: new Date() })
      server.create("user", { name: "Dominique", email: "dominique@gmail.com", password: "12345", createdAt: new Date() })
      server.create("user", { name: "Danielle", email: "Danielle@gmail.com", password: "12345", createdAt: new Date() })
      server.create("user", { name: "Juwan", email: "juwan@gmail.com", password: "12345", createdAt: new Date() })
      server.create("user", { name: "Imani", email: "imani@gmail.com", password: "12345", createdAt: new Date() })
      server.create("user", { name: "Louis", email: "louis@gmail.com", password: "12345", createdAt: new Date() })
    },

    routes() {
      this.namespace = "api"

      this.get("/users", schema => schema.users.all())
      this.get("/user/:id", (schema, request) => {
        let id = request.params.id;
        return schema.movies.find(id);
      })
    }
  })

  return server;
}