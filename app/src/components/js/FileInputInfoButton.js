
// IMPORT
import Badge from 'react-bootstrap/Badge';

// CODE
// This component opens and closes FileInputInfo
export default function FileInputInfoButton ( {func} ) {

    // Handles click
    function handleBadgeClick () {
        func();
    }

    return (
        <Badge bg="secondary" style={{cursor: "pointer"}} onClick={handleBadgeClick}>
            ?
        </Badge>
    );
}