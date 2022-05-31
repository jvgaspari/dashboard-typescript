import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { FranchiseService } from '../../shared/services/api/franchises/FranchiseService';
import { EmployeeService } from '../../shared/services/api/employees/EmployeeService';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const Dashboard = () => {
  const [isLoadingFranchises, setIsLoadingFranchises] = useState(true);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  const [totalCountFranchises, setTotalCountFranchises] = useState(0);
  const [totalCountEmployees, setTotalCountEmployees] = useState(0);

  useEffect(() => {
    setIsLoadingFranchises(true);
    setIsLoadingEmployees(true);

    FranchiseService.getAll(1)
      .then((result) => {
        setIsLoadingFranchises(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountFranchises(result.totalCount);
        }
      });
    EmployeeService.getAll(1)
      .then((result) => {
        setIsLoadingEmployees(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountEmployees(result.totalCount);
        }
      });
  }, []);


  return (
    <LayoutBaseDePagina
      titulo='Página inicial'
      barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2}>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de colaboradores
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingEmployees && (
                      <Typography variant='h1'>
                        {totalCountEmployees}
                      </Typography>
                    )}
                    {isLoadingEmployees && (
                      <Typography variant='h6'>
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de franquias
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingFranchises && (
                      <Typography variant='h1'>
                        {totalCountFranchises}
                      </Typography>
                    )}
                    {isLoadingFranchises && (
                      <Typography variant='h6'>
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>

          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
