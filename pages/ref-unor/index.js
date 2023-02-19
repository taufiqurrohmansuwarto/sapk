import {
    refMasterUnor,
    refSapkUnor,
    updateUnorMaster
} from "@/services/fasilitator.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Alert,
    Button,
    Card,
    message,
    Skeleton,
    Space,
    TreeSelect
} from "antd";
import { useState } from "react";
import Layout from "src/components/Layout";
import PageContainer from "src/components/PageContainer";

function RefUnor() {
    const [master, setMaster] = useState(null);
    const [sapk, setSapk] = useState(null);

    const client = useQueryClient();

    const { data, isLoading } = useQuery(
        ["ref-unor-master"],
        () => refMasterUnor(),
        {
            refetchOnWindowFocus: false
        }
    );

    const { data: unorSapk, isLoading: isLoadingUnorSapk } = useQuery(
        ["ref-unor-sapk"],
        () => refSapkUnor(),
        {
            refetchOnWindowFocus: false
        }
    );

    const { mutate: updateMaster, isLoading: isLoadingUpdateUnorMaster } =
        useMutation((data) => updateUnorMaster(data), {
            onSuccess: () => {
                message.success("Data berhasil disimpan");
                client.invalidateQueries(["ref-unor-master"]);
                setMaster({
                    ...master,
                    id_sapk: sapk
                });
            },
            onError: (err) => {
                message.error(err.message);
            }
        });

    const handleUpdateUnorMaster = () => {
        if (!sapk) {
            message.error("Pilih unor SAPK terlebih dahulu");
        } else {
            const data = {
                id: master.id,
                data: {
                    id_sapk: sapk
                }
            };
            updateMaster(data);
        }
    };

    const handleSelectMaster = (value, label, extra) => {
        // console.log(e);
        const { id_sapk, name, id } = label;

        if (id_sapk) {
            setSapk(id_sapk);
        }

        setMaster({
            id_sapk,
            id,
            name
        });
    };

    return (
        <PageContainer title="Unor">
            <Card>
                <Alert
                    type="warning"
                    message="Perhatian"
                    showIcon
                    description="Pilih UNOR MASTER terlebih dahulu, kemudian pilih UNOR SAPK. Sesuaikan UNOR SAPK dengan UNOR MASTER. Apabila dirasa cocok, klik tombol Update Unor. Untuk SMA, gunakan UNOR SAPK yang berawalan UPT SMA xxx. Apabila tidak ada laporkan pada helpdesk dengan melakukan screenshot. Dengan anda mengupdate unor ini maka akan memudahkan proses integrasi data UNOR antar SIASN dan SIMASTER."
                    style={{ marginBottom: 10 }}
                />
                <Skeleton loading={isLoading || isLoadingUnorSapk}>
                    <Space direction="vertical">
                        <TreeSelect
                            treeData={data}
                            placeholder="UNOR MASTER"
                            showSearch
                            treeNodeFilterProp="name"
                            onSelect={handleSelectMaster}
                            style={{ width: "800px" }}
                        />
                        <TreeSelect
                            placeholder="UNOR SAPK"
                            treeNodeFilterProp="title"
                            showSearch
                            value={sapk}
                            onChange={setSapk}
                            treeData={unorSapk}
                            style={{ width: "800px" }}
                        />
                        <Button
                            onClick={handleUpdateUnorMaster}
                            loading={isLoadingUpdateUnorMaster}
                        >
                            Update Unor
                        </Button>
                    </Space>
                </Skeleton>
            </Card>
        </PageContainer>
    );
}

RefUnor.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RefUnor.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default RefUnor;
