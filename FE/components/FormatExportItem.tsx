import { DeleteIcon } from "lucide-react";
import React from "react";

const FormatExportItem: React.FC<{
    item: string;
    onRemoveFormat: (format: string) => void;
}> = ({ item, onRemoveFormat }) => {
    return (
        <tr>
            <td>{item.toUpperCase()}</td>
            <td>
                <DeleteIcon
                    color="red"
                    className="cursor-pointer"
                    onClick={() => onRemoveFormat(item)}
                />
            </td>
        </tr>
    );
};

export default FormatExportItem;
