import React, { MouseEvent, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Row } from "../lib/Row/Row";
import { TooltipContent } from "../lib/Tooltip";
import { Button } from "../lib/Button/Button";
import Alerts from "../lib/alert/Alerts";
import { AlertContext } from "../lib/alert/AlertContext";
import Loader from "../Loader/Loader";
import api from "../../pages/api/api";
import { getErrors } from "../lib/utils/utils";
import { TSortedBy } from "./ListTypes";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import { TListOfItemsProps, TListItems } from "./ListTypes";
import { TBaseItem } from "../Detail/DetailTypes";
import { redirect } from "../lib/utils/utils";

const ListOfItems = <TItem extends TBaseItem>(props: TListOfItemsProps<TItem>) => {
    const context = useContext(AlertContext);
    const [loading, setLoading] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<TItem | undefined>(undefined);
    const [items, setItems] = useState<TListItems<TItem>>([]);
    const [sortedBy, setSortedBy] = useState<TSortedBy>(props.functions.getDefaultSortedBy());
    const history = useRouter();

    const getItems = async () => {
        setLoading(true);
        //console.log('getItems owner', this.props.owner);
        try {
            const res: any = await api.queryServer(props.functions.url, {
                sorted_by: sortedBy,
                owner: props.owner ?? -1,
            });

            // console.log('ListOfItems.getItems res.data', res.data);

            setItems(res.data as TListItems<TItem>);
        } catch (err) {
            context.setAlerts({ messages: getErrors(err.response?.data) });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getItems();
        // console.log('ListOfItems.getItems items', items);
    }, []);

    useEffect(() => {
        getItems();
    }, [sortedBy, props.owner]);

    const getItemById = (id: number) => {
        return items.filter((item: any) => +item.id === +id)[0];
    };

    const btnSortClick = (e: MouseEvent<HTMLElement>) => {
        const sorted_name = (e.target as HTMLElement).id;
        //console.log('btnSortClick.sorted_name', sorted_name);

        if (!sorted_name) return;
        if (sortedBy.name !== sorted_name) {
            setSortedBy({
                name: sorted_name,
                direction: "desc",
            });
        } else {
            const direction = sortedBy.direction === "desc" ? "asc" : "desc";
            setSortedBy({
                ...sortedBy,
                direction: direction,
            });
        }
    };

    const btnDelClick = (e: MouseEvent<HTMLButtonElement>) => {
        const item = getItemById(Number((e.target as HTMLButtonElement).value));
        // console.log('ListOfItems.btnDelClick item', item);
        setItemToDelete(item);
        setShowDeleteDialog(true);
    };

    const btnAddClick = async (e: MouseEvent<HTMLElement>) => {
        try {
            const res = await api.queryServer(props.functions.url, { btn_add: "" });
            redirect(history, res.data.redirect);
        } catch (err) {
            context.setAlerts({ messages: getErrors(err.response?.data) });
        }
    };

    const btnEditClick = (e: MouseEvent<HTMLButtonElement>) => {
        const item_pk = (e.target as HTMLButtonElement).value;

        sessionStorage.setItem(props.functions.idKey, item_pk);
        history.push(props.functions.detailUrl);
    };

    const getItemId = (item: TItem | undefined): number => (item ? item.id : -1);

    const deleteItem = async (confirm: string) => {
        setShowDeleteDialog(false);

        if (confirm === "true") {
            setLoading(true);
            try {
                const res = await api.queryServer(props.functions.url, {
                    sorted_by: sortedBy,
                    btn_del: "",
                    item_pk: getItemId(itemToDelete),
                    owner: props.owner ?? -1,
                });
                setItems(res.data);
                context.setAlerts({
                    messages: [
                        {
                            type: "success",
                            message: `${props.functions.nameOfItem} успешно удален`,
                        },
                    ],
                });
            } catch (err) {
                context.setAlerts({ messages: getErrors(err.response.data) });
            } finally {
                setLoading(false);
            }
        }
    };

    const getButtons = (id: string) => {
        return (
            <Row>
                <Button
                    value={id}
                    variant="primary"
                    className="btn-primary tooltip"
                    onClick={btnEditClick}
                >
                    <TooltipContent className="tooltip__content tooltip__content_left">
                        Редактирование
                    </TooltipContent>
                    {"\u27f6"}
                </Button>
                <Button
                    value={id}
                    variant="danger"
                    className="btn-danger btn-danger_del tooltip"
                    onClick={btnDelClick}
                >
                    <TooltipContent className="tooltip__content tooltip__content_left">
                        Удаление
                    </TooltipContent>
                    &times;
                </Button>
            </Row>
        );
    };

    const getAddButton = () => {
        if (props.functions.addButton)
            return (
                <Button
                    variant="primary"
                    className="btn-primary btn-primary_add tooltip"
                    onClick={btnAddClick}
                >
                    <TooltipContent>Добавление&nbsp;нового&nbsp;автовладельца</TooltipContent>+
                </Button>
            );
        return <></>;
    };

    return (
        <div>
            <Alerts withAlerts={props.withAlerts} />
            {showDeleteDialog && (
                <DeleteDialog
                    nameOfItem={props.functions.nameOfItem}
                    itemToDelete={itemToDelete!}
                    deleteItem={deleteItem}
                    itemInfo={props.functions.itemInfo}
                    onClose={() => setShowDeleteDialog(false)}
                />
            )}
            {loading ? (
                <Loader />
            ) : (
                <>
                    {props.functions.getTable(items, getButtons, btnSortClick, sortedBy)}
                    {getAddButton()}
                </>
            )}
        </div>
    );
};

export default ListOfItems;
