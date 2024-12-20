import { Elysia } from "elysia";
import { authService } from "../../lib/Axios";

interface IRegister {
    body: {
        username: string;
        password: string;
    };
    cookie: {
        token: any;
    };
}

interface ILogin {
    body: {
        username: string;
        password: string;
    };
    cookie: {
        token: any;
    };
}



const router = new Elysia().group("/user", (app) =>
    app
        .post("/register", async ({ body }: IRegister) => {
            const { username, password } = body;

            const { data } = await authService.post("/register", {
                username,
                password,
            });

            return {
                data
            };
        })
        .post("/login", async ({ body, cookie: { token } }: ILogin) => {
            const { username, password } = body;

            const { data } = await authService.post("/login", {
                username,
                password,
            });

            token.set({
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                value: data.user,
            });

            return {
                data
            };
        })
        // .get("/user", async ({ cookie: { token } }: { cookie: { token: { value: any } } }) => {
        //     const { data } = await authService.get(`/user/${token.value}`);
        //     return {
        //         message: "Get user success",
        //         data,
        //     };
        // })
        .get("/all-users", async () => {
            const { data } = await authService.get("/all-users");
            return {
                message: "Get all users success",
                data,
            };
        })
        .get("/:id", async ({ params }: { params: { id: string } }) => {
            const { id } = params;
            const { data } = await authService.get(`/user/${id}`);

            return {
                data
            };
        })
);

export default router;
