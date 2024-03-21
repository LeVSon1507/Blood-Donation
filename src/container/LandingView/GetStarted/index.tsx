import React from 'react';
import { Box, Grid, styled, Typography } from '@mui/material';
import Title from '../Title';
import LazyShow from '../Animated/LazyShow';

const GetStarted = (props) => {
  const { title1, title2, content1, content2, imgDetail1, imgDetail2 } = props;

  const CustomGridItem = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  });

  const CustomTypography = styled(Typography)({
    fontSize: '1.1rem',
    textAlign: 'start',
    lineHeight: '1.5',
    color: '#515151',
    marginTop: '1.5rem',
  });

  return (
    <LazyShow>
      <Grid
        container
        spacing={{ xs: 4, sm: 4, md: 0 }}
        sx={{
          py: 10,
          px: 2,
        }}
      >
        <CustomGridItem
          item
          xs={12}
          sm={8}
          md={6}
          // component = 'section'
        >
          <Box
            component="article"
            sx={{
              px: 4,
            }}
          >
            <Title text={title1} textAlign={'start'} />
            <CustomTypography>{content1}</CustomTypography>
          </Box>
        </CustomGridItem>

        <Grid item xs={12} sm={4} md={6}>
          <img
            src={imgDetail1}
            alt=""
            style={{
              width: '100%',
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          md={6}
          sx={{
            order: { xs: 4, sm: 4, md: 3 },
          }}
        >
          <img
            src={imgDetail2}
            alt=""
            style={{
              width: '100%',
            }}
          />
        </Grid>

        <CustomGridItem
          item
          xs={12}
          sm={8}
          md={6}
          sx={{
            order: { xs: 3, sm: 3, md: 4 },
          }}
        >
          <Box
            component="article"
            sx={{
              px: 4,
            }}
          >
            <Title text={title2} textAlign={'start'} />
            <CustomTypography>{content2}</CustomTypography>
          </Box>
        </CustomGridItem>
      </Grid>
    </LazyShow>
  );
};

export default GetStarted;
