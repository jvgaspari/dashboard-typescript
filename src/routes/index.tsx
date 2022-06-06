import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import {
  Dashboard,
  DetailEmployees,
  ListEmployee,
  ListFranchises,
  DetailFranchises,
} from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'location_city',
        path: '/franquias',
        label: 'Franquias',
      },
      {
        icon: 'people',
        path: '/colaboradores',
        label: 'Colaboradores',
      },
      {
        icon: 'attach_money',
        path: '/financas',
        label: 'Faturamento',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/colaboradores" element={<ListEmployee />} />
      <Route path="/colaboradores/detalhe/:id" element={<DetailEmployees />} />

      <Route path="/franquias" element={<ListFranchises />} />
      <Route path="/franquias/detalhe/:id" element={<DetailFranchises />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
