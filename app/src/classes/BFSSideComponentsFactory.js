
import ListGroup from 'react-bootstrap/ListGroup';
import SideComponent from './SideComponent';

export default class BFSSideComponentsFactory {


    createSideComponents(data) {

        let queue = data["queue"];

        let items = [];
        for (const node of queue) {
            items.push(<ListGroup.Item>{node}</ListGroup.Item>);
        }

        let queueComponent = 
            <ListGroup>
                {items}
            </ListGroup>;

        return [new SideComponent("Queue", queueComponent)];
    }

}