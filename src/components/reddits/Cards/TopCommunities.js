import { Avatar, Card, List } from "antd";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { dashboardDiscussions } from "../../../../services/main.services";

function TopCommunities() {
    const { data, isLoading } = useQuery(["top-communities"], () =>
        dashboardDiscussions("komunitas")
    );

    const router = useRouter();

    const gotoDetail = (id) => {
        router.push(`/discussions/r/${id}`);
    };

    return (
        <Card size="small" title="Komunitas Paling Ramai" loading={isLoading}>
            <List
                dataSource={data}
                loading={isLoading}
                size="small"
                rowKey={(row) => row?.id}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar />}
                            title={
                                <div
                                    style={{ cursor: "pointer" }}
                                    onClick={() => gotoDetail(item?.title)}
                                >
                                    {item?.title}
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
}

export default TopCommunities;
