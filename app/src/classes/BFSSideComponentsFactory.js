
import ListGroup from 'react-bootstrap/ListGroup';
import SideComponent from './SideComponent';
import GraphView from '../components/GraphView/GraphView';
import GraphFactory from './GraphFactory';
import graphExamplesArray from '../graph_examples/all_examples';

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

        let graph = new GraphFactory().createDisplayGraphFromJSON(graphExamplesArray[0]);
        let treeComponent = <GraphView graph={graph} refreshState={true}></GraphView>;

        return [new SideComponent("Queue", queueComponent), new SideComponent("Tree", treeComponent)];
    }

}