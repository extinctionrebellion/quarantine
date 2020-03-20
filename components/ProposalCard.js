import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function ProposalCard(props) {
  const classes = useStyles();
  const { item } = props;

  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {item.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {item.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {item.detail}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {item.status}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

ProposalCard.propTypes = {
  item: PropTypes.object,
};