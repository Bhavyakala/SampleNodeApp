import { DocumentCard, Stack, StackItem, mergeStyleSets } from "@fluentui/react";

export interface ICardProps {
    title: string;
    description: string;
    imageUrl: string;
}
export const Card = (props: ICardProps) => {
    const classNames = mergeStyleSets({
        container: {
            borderRadius: "4px",
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(243 247 251)",
            border: "2px solid rgb(105 175 229)",
        },
    });

    return (
        <DocumentCard className={classNames.container}>
            <div>
                <Stack tokens={{ childrenGap: 2 }}>
                    <StackItem>
                        <img src={props.imageUrl} alt="thumbnail" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                    </StackItem>
                    <StackItem>{props.title}</StackItem>
                    <StackItem>{props.description}</StackItem>
                </Stack>
            </div>
        </DocumentCard>
    );
};
