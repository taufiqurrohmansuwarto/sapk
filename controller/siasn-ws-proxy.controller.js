export const dataAnak = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/data-anak/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const dataPasangan = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/data-pasangan/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const dataUtama = async (req, res) => {
    try {
        const { nip } = req?.query;

        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/data-utama/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const dataOrtu = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/data-ortu/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const dataPNS = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(`/siasn-ws/proxy/pns/data-pns/${nip}`);

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const kenaikanGajiBerkala = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(`/siasn-ws/proxy/pns/rw-kgb/${nip}`);

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const hukumanDisiplin = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/rw-hukdis/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const kinerja = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/rw-kinerja/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const organisasi = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/rw-organisasi/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const penghargaan = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/rw-penghargaan/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const angkaKredit = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/rw-angkakredit/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const diklat = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/rw-diklat/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const jabatan = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/rw-jabatan/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const cltn = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(`/siasn-ws/proxy/pns/rw-cltn/${nip}`);

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const pindahInstansi = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/rw-pindahinstansi/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const pmk = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(`/siasn-ws/proxy/pns/rw-pmk/${nip}`);

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const pendidikan = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/rw-pendidikan/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const golongan = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/pns/rw-golongan/${nip}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const foto = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(`/siasn-ws/proxy/pns/foto/${nip}`, {
            responseType: "arraybuffer"
        });

        // return image
        res.writeHead(200, {
            "Content-Type": "image/jpeg",
            "Content-Length": result?.data?.length
        });

        res.end(Buffer.from(result?.data, "binary"));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

export const download = async (req, res) => {
    try {
        const { file_path } = req?.query;
        const { fetcher } = req;

        const result = await fetcher.get(
            `/siasn-ws/proxy/download?file_path=${file_path}`
        );

        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};
