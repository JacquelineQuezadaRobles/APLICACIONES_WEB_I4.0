import { Button, Input, Table, Space } from "antd";
import { useState } from "react";

export default function UseData() {
    const [search, setSearch] = useState('');

    // Datos de ejemplo para que funcione
    const rawData = [
        { id: 1, name: "Juan Pérez", email: "juan@example.com" },
        { id: 2, name: "Ana López", email: "ana@example.com" },
        { id: 3, name: "Carlos Ruiz", email: "carlos@example.com" }
    ];

    const data = rawData.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a: any, b: any) => a.email.localeCompare(b.email)
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_: any, record: any) => (
                <Space>
                    <Button size="small" type="primary">
                        Editar
                    </Button>
                    <Button size="small" danger>
                        Borrar
                    </Button>
                </Space>
            ),
        }
    ];

    return (
        <div className="p-4">
            <Input.Search
                className="mb-4 w-60"
                placeholder="Buscar"
                onChange={(e) => setSearch(e.target.value)}
            />
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 2 }}
                rowKey="id"
            />
        </div>
    );
}
