
import ListGroup from 'react-bootstrap/ListGroup';

export default class BFSComponentCreator {


    createComponents(data) {

        let queue = data["queue"];

        let items = [];
        for (const node of queue) {
            items.push(<ListGroup.Item>{node}</ListGroup.Item>);
        }

        let queueComponent = 
            <ListGroup>
                {items}
            </ListGroup>;

        return {"Queue": queueComponent};
    }

}