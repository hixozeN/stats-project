import master from 'shared/assets/icons/tank/mastery/master.png';
import firstStage from 'shared/assets/icons/tank/mastery/first_stage.png';
import secondStage from 'shared/assets/icons/tank/mastery/second_stage.png';
import thirdStage from 'shared/assets/icons/tank/mastery/third_stage.png';
import LightTank from 'shared/assets/icons/tank/type/class-lt.svg';
import MediumTank from 'shared/assets/icons/tank/type/class-mt.svg';
import HeavyTank from 'shared/assets/icons/tank/type/class-ht.svg';
import ATSPG from 'shared/assets/icons/tank/type/class-pt.svg';
import China from 'shared/assets/icons/tank/nation/nation-china.svg';
import EU from 'shared/assets/icons/tank/nation/nation-eu.svg';
import France from 'shared/assets/icons/tank/nation/nation-france.svg';
import Germany from 'shared/assets/icons/tank/nation/nation-germany.svg';
import Japan from 'shared/assets/icons/tank/nation/nation-japan.svg';
import Other from 'shared/assets/icons/tank/nation/nation-other.svg';
import UK from 'shared/assets/icons/tank/nation/nation-uk.svg';
import USA from 'shared/assets/icons/tank/nation/nation-usa.svg';
import USSR from 'shared/assets/icons/tank/nation/nation-ussr.svg';

import plug from 'shared/assets/images/plug_tank_200x200.png';

const masteryTank = {
  4: master,
  3: firstStage,
  2: secondStage,
  1: thirdStage,
};

const typeIcon = {
  lightTank: <LightTank />,
  mediumTank: <MediumTank />,
  heavyTank: <HeavyTank />,
  'AT-SPG': <ATSPG />,
};

const nationFlag = {
  china: <China />,
  european: <EU />,
  france: <France />,
  germany: <Germany />,
  japan: <Japan />,
  other: <Other />,
  uk: <UK />,
  usa: <USA />,
  ussr: <USSR />,
};

export {
  masteryTank, typeIcon, nationFlag, plug,
};
