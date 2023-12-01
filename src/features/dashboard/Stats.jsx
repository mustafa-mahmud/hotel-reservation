import {
  HiOutlineBriefcase,
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from 'react-icons/hi';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

/* eslint-disable react/prop-types */

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);

  ///////////////////////////////////////////////////
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineCurrencyDollar />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check In"
        color="yellow"
        icon={<HiOutlineCalendar />}
        value={checkins}
      />
      <Stat
        title="Occupancy Rate"
        color="indigo"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
};

export default Stats;
