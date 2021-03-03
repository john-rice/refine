import React from "react";
import { Card, Row, Col } from "antd";
import humanizeString from "humanize-string";

import { TableProps } from "@components/table";
import { useTranslate } from "@hooks";
import { OptionalComponent } from "@definitions";
import { CreateButton } from "@components";

export interface ListProps {
    resourceName: string;
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
    aside?: React.FC;
    title?: string;
}

export const List: React.FC<ListProps> = ({
    resourceName,
    canCreate,
    canEdit,
    canDelete,
    canShow,
    aside,
    title,
    children,
}) => {
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement<TableProps>(child, {
                resourceName,
                canEdit,
                canDelete,
                canShow,
            });
        }
        return child;
    });
    const translate = useTranslate();

    return (
        <Row gutter={[16, 16]}>
            <Col flex="1 1 200px">
                <Card
                    bodyStyle={{ padding: 0, flex: 1 }}
                    title={
                        title ??
                        translate(
                            `common:resources.${resourceName}.title`,
                            humanizeString(resourceName),
                        )
                    }
                    extra={canCreate && <CreateButton size="middle" />}
                >
                    {childrenWithProps}
                </Card>
            </Col>

            {aside && (
                <Col flex="0 1 300px">
                    <OptionalComponent optional={aside} />
                </Col>
            )}
        </Row>
    );
};
