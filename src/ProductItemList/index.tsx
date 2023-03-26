import { TableResponse } from "types/api/table";
import * as S from "./style";


interface ProductItemListProps {
    onSelectTable: (data: number) => void;
    children: React.ReactNode;
    tables: TableResponse[];
}
const ProductItemList = ({ children, tables = [], onSelectTable }: ProductItemListProps) => {
    return (
        <section>
            <S.ProductItemListHeader>
                <S.ProductItemListHeaderTitle>Escolha os sabores</S.ProductItemListHeaderTitle>
                <S.ProductItemListHeaderSelect
                    onChange={({ target }) => onSelectTable(Number(target.value))}
                    name="table"
                    id="table"
                >
                    <option value="default">Selecione a mesa</option>
                    {tables.map((table, index) => (
                        <option value={table.number} key={`ProductItemListOption-${index}`}>Mesa {table.number}</option>
                    ))}
                </S.ProductItemListHeaderSelect>
            </S.ProductItemListHeader>
            <S.ProductItemList>
                {children}
            </S.ProductItemList>
        </section>
    );
}

export default ProductItemList;