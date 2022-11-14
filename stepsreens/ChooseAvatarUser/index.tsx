import React from 'react';
import clsx from 'clsx';
import { WhitePlatte } from '../WhitePlatte';
import { Button } from '../../components/Button';
import { Info } from '../../components/Info';
import { Avatar } from '../../components/Avatar';

import styles from './ChooseAvatarUser.module.scss';
import { MyContext } from '../../pages'
import { Axios } from '../../core/axios';


const uploadFile = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('photo', file);

  const { data } = await Axios({
    method: 'POST',
    url: '/upload',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};

export const ChooseAvatarUser: React.FC = () => {
  const { onNextStep, setFieldValue, userData } = React.useContext(MyContext);
  const avatarLetters = userData?.fullname
    .split(' ')
    .map((s) => s[0])
    .join('');
  const [avatarUrl, setAvatarUrl] = React.useState<string>('https://sun2-3.userapi.com/s/v1/if1/CAR1Aao3yIica7xq77xIIMMTn29CME-cE5JSJBc8OTNVt29JQjnhR0ZsX_9IO-AzgwVbfgB6.jpg?size=200x0&quality=96&crop=138,44,1048,1048&ava=1');
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files![0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
      const data = await uploadFile(file);
      target.value = '';
      setAvatarUrl(data.url);
      setFieldValue('avatarUrl', data.url);
    }
  };

  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

  return (
    <div className={styles.block}>
      <Info
        icon="/static/celebration.png"
        title={`Okay, 4t5t54!`}
        description="How’s this photo?"
      />
      <WhitePlatte className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <div className={styles.avatar}>
          <Avatar width="120px" height="120px" src={avatarUrl} letters={avatarLetters} />
        </div>
        <div className="mb-30">
          <label htmlFor="image" className="link cup">
            Choose a different photo
          </label>
        </div>
        <input id="image" ref={inputFileRef} type="file" hidden />
        <Button onClick={onNextStep}>
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" />
        </Button>
      </WhitePlatte>
    </div>
  );
};
