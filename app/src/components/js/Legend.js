
import Table from "react-bootstrap/esm/Table";

export default function Legend( {data} ) {

    let content = [];

    for (const sublegend of data) {

        const title = sublegend["title"];
        
        const type = sublegend["type"];
        let symbol = " ";
        if (type === "circle") {
            symbol = "⬤";
        } else if (type === "rectangle") {
            symbol = "▬";
        }

        const rows = sublegend["rows"];

        let rowsContent = [];
        for (const row of rows) {
            const color = row["color"];
            const key = row["key"];

            rowsContent.push(
                <tr key={key}>
                    <td style={{color: color}} className="w-25">{symbol}</td>
                    <td className="w-75">{key}</td>
                </tr>
            );
        }

        content.push(
            <div key={title}>
                <h4>{title}</h4>
                <Table>
                    <thead className='border'>
                        <tr>
                            <th>Color</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody className='border'>
                        {rowsContent}
                    </tbody>
                </Table>
            </div>
        );

    }

    return (
        <>
            {content}
        </>
    ); 

}