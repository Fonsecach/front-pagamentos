import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';

const NavigationMenu = () => {
    const navigate = useNavigate();
    const items: MenuItem[] = [
        {
            label: 'Início',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        {
            label: 'Pessoas',
            icon: 'pi pi-user',
            items: [
                {
                    label: 'Listar',
                    icon: 'pi pi-list',
                    command: () => navigate('/pessoas')
                },
                {
                    label: 'Cadastrar',
                    icon: 'pi pi-user-plus',
                    command: () => navigate('/pessoas/cadastrar')
                }
            ]           
        },
        {
            label: 'Pedidos',
            icon: 'pi pi-list',
            items: [
                {
                    label: 'Listar',
                    icon: 'pi pi-list',
                    command: () => navigate('/pedidos')
                },
                {
                    label: 'Cadastrar',
                    icon: 'pi pi-cart-plus',
                    command: () => navigate('/pedidos/cadastrar')
                }
            ]
        },
        {
            label: 'Pagamentos',
            icon: 'pi pi-dollar',
            items: [
                {
                    label: 'Listar',
                    icon: 'pi pi-list',
                    command: () => navigate('/pagamentos')
                },
                {
                    label: 'Cadastrar',
                    icon: 'pi pi-receipt',
                    command: () => navigate('/pagamentos/cadastrar')
                }
            ]
        },
        {
            label: 'Sobre',
            icon: 'pi pi-info-circle',
            command: () => navigate('/about')
        },
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    );
};

export default NavigationMenu;
