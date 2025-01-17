import { CHAT_GROUP, PPTSIGN } from '../configs/api';
import { cookieSerialize, request } from '../utils/request';

export const LocationSign = async (
  args: BasicCookie & { name: string; address: string; activeId: string; lat: string; lon: string; fid: string }
): Promise<string> => {
  const { name, address, activeId, lat, lon, fid, ...cookies } = args;
  const url = `${PPTSIGN.URL}?name=${name}&address=${address}&activeId=${activeId}&uid=${cookies._uid}&clientip=&latitude=${lat}&longitude=${lon}&fid=${fid}&appType=15&ifTiJiao=1`;
  const result = await request(url, {
    secure: true,
    headers: {
      Cookie: cookieSerialize(cookies),
    },
  });
  if (result.data === 'success') {
    console.log(`[位置]签到成功`);
    return 'success';
  }
  console.log(result.data);
  return result.data;
};

/**
 * 位置签到，无课程群聊版本
 */
export const LocationSign_2 = async (
  args: BasicCookie & { name: string; address: string; activeId: string; lat: string; lon: string; fid: string }
): Promise<string> => {
  const { name, address, activeId, lat, lon, fid, ...cookies } = args;
  let formdata = `address=${encodeURIComponent(address)}&activeId=${activeId}&uid=${
    cookies._uid
  }&clientip=&useragent=&latitude=${lat}&longitude=${lon}&fid=&ifTiJiao=1`;
  const result = await request(
    CHAT_GROUP.SIGN.URL,
    {
      secure: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Cookie: cookieSerialize(cookies),
      },
    },
    formdata
  );
  if (result.data === 'success') {
    console.log(`[位置]签到成功`);
    return 'success';
  }
  console.log(result.data);
  return result.data;
};
