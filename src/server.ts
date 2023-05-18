import AuthRouteV1 from "./routes/v1/auth.route";
import App from "./app";
import UserRouteV1 from "./routes/v1/user.route";
import PickUpRouteV1 from "./routes/v1/pickup.route";
import DeliveryRouteV1 from "./routes/v1/delivery.route";
const app = new App([
    new AuthRouteV1(),
    new UserRouteV1(),
    new PickUpRouteV1(),
    new DeliveryRouteV1(),
]);

app.listen();
export { app };
