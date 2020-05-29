import { Server, JSONAPISerializer, Model } from 'miragejs';

export function makeServer({ environment = "test" } = {}) {
  let server = new Server({
    environment,

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