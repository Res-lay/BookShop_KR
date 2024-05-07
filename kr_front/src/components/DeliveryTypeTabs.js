import {Card, CardBody, Tab, Tabs} from "@nextui-org/react";

export default function DeliveryTypeTabs() {
    return (
        <div>
            <Tabs aria-label="Options" color="secondary">
                <Tab key="courirer" title="Courier">
                    <Card>
                        <CardBody>
                            Courier delivery provides you with convenience and reliability, allowing you to receive your
                            order
                            right on the door of your home or office. Our courier service guarantees fast and reliable
                            delivery.
                            safe delivery at a time convenient for you.Choose courier delivery for maximum comfort.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="pick-up point" title="Pick-up point">
                    <Card>
                        <CardBody>
                            Delivery to the pick-up point provides you with flexibility and convenience, allowing you to
                            receive your order at a convenient place and time. Choose from a network of pick-up points
                            located throughout the city and pick up your order at a convenient time for you.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>

    );
}