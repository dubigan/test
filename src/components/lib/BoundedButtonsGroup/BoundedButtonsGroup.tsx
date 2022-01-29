/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-body-style */
import React, {
    useEffect, useState,
} from 'react';

const getKey = () => Math.ceil(Math.random() * 1000000).toString();

type TBoundedButtonsGroup = {
    groupName?: string;
    children: React.ReactElement[];
    // children: React.ReactNode;
    cssForGroup?: string;
    cssForButton?: string;
    defBtn?: number;
    values?: string[];
    setValue?: ((v: string | null | undefined) => void) | null;
    idGenerator?: (() => string) | null;
    emptySelection?: boolean;
};

const ACTIVE_CLASSNAME = 'active';
const EMPTY_DATAVALUE = 'value';
const DATAVALUE_KEY = 'data-value';

const BoundedButtonsGroup = ({
    groupName,
    cssForGroup,
    cssForButton,
    children,
    defBtn,
    values = [],
    setValue = null,
    idGenerator = null,
    emptySelection = false,
}: TBoundedButtonsGroup) => {
    // const ref = useForwardRef(null);
    const idGen = idGenerator || getKey;
    const groupId = idGen();
    const [childrenWithRef, setChildrenWithRef] = useState<React.ReactNode>(null);

    useEffect(() => {
        setChildrenWithRef(
            React.Children.map(children, (child, index) => {
                // console.log('BoundButtonsGroup.child', child);
                const cl = defBtn === index ? `${cssForButton} ${ACTIVE_CLASSNAME}` : cssForButton;
                return React.cloneElement(child, {
                    ref: React.createRef(),
                    // name: groupName,
                    id: idGen(),
                    onClick: handleClick,
                    className: cl,
                    [DATAVALUE_KEY]: values[index] ?? EMPTY_DATAVALUE,
                });
            }),
        );
    }, [children]);

    const findChild = (element: HTMLElement | null) : HTMLElement | null => {
        if (!element) return null;
        if (element.id === groupId) return null;
        if (element.id && element.id !== '__next') return element;
        return findChild(element.parentElement);
    };

    const handleClick = (e: MouseEvent) => {
        // React.Children.forEach(childrenWithRef, (child) =>
        //     console.log('BoundButtonsGroup', child)
        // );
        e.stopPropagation();
        const child = findChild(e.target as HTMLElement);
        if (!child) return;
        if (emptySelection) child.classList.toggle(ACTIVE_CLASSNAME);
        else child.classList.add(ACTIVE_CLASSNAME);
        child.classList.contains(ACTIVE_CLASSNAME)
            ? setValue?.(child.dataset[DATAVALUE_KEY.split('-')[1]])
            : setValue?.(null);

        Array.from(child.parentElement!.children).forEach((c) => {
            // console.log(c.id, child.id);
            if (c.id !== child.id) c.classList.remove(ACTIVE_CLASSNAME);
        });
        // console.log('BoundButtonsGroup', child.dataset['value']);
    };
    return (
        <div className={cssForGroup} id={groupId}>
            {childrenWithRef}
        </div>
    );
};

export default BoundedButtonsGroup;
