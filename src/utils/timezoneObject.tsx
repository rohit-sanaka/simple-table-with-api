const timezones = [
  {
    label: '--None--',
    value: '',
  },
  {
    value: '-11:00',
    label: 'Pacific/Midway',
  },
  {
    value: '-11:00',
    label: 'US/Samoa',
  },
  {
    value: '-10:00',
    label: 'US/Hawaii',
  },
  {
    value: '-9:00',
    label: 'US/Alaska',
  },
  {
    value: '-8:00',
    label: 'US/Pacific',
  },
  {
    value: '-8:00',
    label: 'America/Tijuana',
  },
  {
    value: '-7:00',
    label: 'US/Arizona',
  },
  {
    value: '-7:00',
    label: 'US/Mountain',
  },
  {
    value: '-7:00',
    label: 'America/Chihuahua',
  },
  {
    value: '-7:00',
    label: 'America/Mazatlan',
  },
  {
    value: '-6:00',
    label: 'America/Mexico_City',
  },
  {
    value: '-6:00',
    label: 'America/Monterrey',
  },
  {
    value: '-6:00',
    label: 'Canada/Saskatchewan',
  },
  {
    value: '-6:00',
    label: 'US/Central',
  },
  {
    value: '-5:00',
    label: 'US/Eastern',
  },
  {
    value: '-5:00',
    label: 'US/East-Indiana',
  },
  {
    value: '-5:00',
    label: 'America/Bogota',
  },
  {
    value: '-5:00',
    label: 'America/Lima',
  },
  {
    value: '-4:30',
    label: 'America/Caracas',
  },
  {
    value: '-4:00',
    label: 'Canada/Atlantic',
  },
  {
    value: '-4:00',
    label: 'America/La_Paz',
  },
  {
    value: '-4:00',
    label: 'America/Santiago',
  },
  {
    value: '-3:30',
    label: 'Canada/Newfoundland',
  },
  {
    value: '-3:00',
    label: 'America/Buenos_Aires',
  },
  {
    value: '-3:00',
    label: 'Greenland',
  },
  {
    value: '-2:00',
    label: 'Atlantic/Stanley',
  },
  {
    value: '-1:00',
    label: 'Atlantic/Azores',
  },
  {
    value: '-1:00',
    label: 'Atlantic/Cape_Verde',
  },
  {
    value: '00:00',
    label: 'Africa/Casablanca',
  },
  {
    value: '00:00',
    label: 'Europe/Dublin',
  },
  {
    value: '00:00',
    label: 'Europe/Lisbon',
  },
  {
    value: '00:00',
    label: 'Europe/London',
  },
  {
    value: '00:00',
    label: 'Africa/Monrovia',
  },
  {
    value: '+1:00',
    label: 'Europe/Amsterdam',
  },
  {
    value: '+1:00',
    label: 'Europe/Belgrade',
  },
  {
    value: '+1:00',
    label: 'Europe/Berlin',
  },
  {
    value: '+1:00',
    label: 'Europe/Bratislava',
  },
  {
    value: '+1:00',
    label: 'Europe/Brussels',
  },
  {
    value: '+1:00',
    label: 'Europe/Budapest',
  },
  {
    value: '+1:00',
    label: 'Europe/Copenhagen',
  },
  {
    value: '+1:00',
    label: 'Europe/Ljubljana',
  },
  {
    value: '+1:00',
    label: 'Europe/Madrid',
  },
  {
    value: '+1:00',
    label: 'Europe/Paris',
  },
  {
    value: '+1:00',
    label: 'Europe/Prague',
  },
  {
    value: '+1:00',
    label: 'Europe/Rome',
  },
  {
    value: '+1:00',
    label: 'Europe/Sarajevo',
  },
  {
    value: '+1:00',
    label: 'Europe/Skopje',
  },
  {
    value: '+1:00',
    label: 'Europe/Stockholm',
  },
  {
    value: '+1:00',
    label: 'Europe/Vienna',
  },
  {
    value: '+1:00',
    label: 'Europe/Warsaw',
  },
  {
    value: '+1:00',
    label: 'Europe/Zagreb',
  },
  {
    value: '+2:00',
    label: 'Europe/Athens',
  },
  {
    value: '+2:00',
    label: 'Europe/Bucharest',
  },
  {
    value: '+2:00',
    label: 'Africa/Cairo',
  },
  {
    value: '+2:00',
    label: 'Africa/Harare',
  },
  {
    value: '+2:00',
    label: 'Europe/Helsinki',
  },
  {
    value: '+2:00',
    label: 'Europe/Istanbul',
  },
  {
    value: '+2:00',
    label: 'Asia/Jerusalem',
  },
  {
    value: '+2:00',
    label: 'Europe/Kiev',
  },
  {
    value: '+2:00',
    label: 'Europe/Minsk',
  },
  {
    value: '+2:00',
    label: 'Europe/Riga',
  },
  {
    value: '+2:00',
    label: 'Europe/Sofia',
  },
  {
    value: '+2:00',
    label: 'Europe/Tallinn',
  },
  {
    value: '+2:00',
    label: 'Europe/Vilnius',
  },
  {
    value: '+3:00',
    label: 'Asia/Baghdad',
  },
  {
    value: '+3:00',
    label: 'Asia/Kuwait',
  },
  {
    value: '+3:00',
    label: 'Africa/Nairobi',
  },
  {
    value: '+3:00',
    label: 'Asia/Riyadh',
  },
  {
    value: '+3:00',
    label: 'Europe/Moscow',
  },
  {
    value: '+3:30',
    label: 'Asia/Tehran',
  },
  {
    value: '+4:00',
    label: 'Asia/Baku',
  },
  {
    value: '+4:00',
    label: 'Europe/Volgograd',
  },
  {
    value: '+4:00',
    label: 'Asia/Muscat',
  },
  {
    value: '+4:00',
    label: 'Asia/Tbilisi',
  },
  {
    value: '+4:00',
    label: 'Asia/Yerevan',
  },
  {
    value: '+4:30',
    label: 'Asia/Kabul',
  },
  {
    value: '+5:00',
    label: 'Asia/Karachi',
  },
  {
    value: '+5:00',
    label: 'Asia/Tashkent',
  },
  {
    value: '+5:30',
    label: 'Asia/Kolkata',
  },
  {
    value: '+5:45',
    label: 'Asia/Kathmandu',
  },
  {
    value: '+6:00',
    label: 'Asia/Yekaterinburg',
  },
  {
    value: '+6:00',
    label: 'Asia/Almaty',
  },
  {
    value: '+6:00',
    label: 'Asia/Dhaka',
  },
  {
    value: '+7:00',
    label: 'Asia/Novosibirsk',
  },
  {
    value: '+7:00',
    label: 'Asia/Bangkok',
  },
  {
    value: '+7:00',
    label: 'Asia/Jakarta',
  },
  {
    value: '+8:00',
    label: 'Asia/Krasnoyarsk',
  },
  {
    value: '+8:00',
    label: 'Asia/Chongqing',
  },
  {
    value: '+8:00',
    label: 'Asia/Hong_Kong',
  },
  {
    value: '+8:00',
    label: 'Asia/Kuala_Lumpur',
  },
  {
    value: '+8:00',
    label: 'Australia/Perth',
  },
  {
    value: '+8:00',
    label: 'Asia/Singapore',
  },
  {
    value: '+8:00',
    label: 'Asia/Taipei',
  },
  {
    value: '+8:00',
    label: 'Asia/Ulaanbaatar',
  },
  {
    value: '+8:00',
    label: 'Asia/Urumqi',
  },
  {
    value: '+9:00',
    label: 'Asia/Irkutsk',
  },
  {
    value: '+9:00',
    label: 'Asia/Seoul',
  },
  {
    value: '+9:00',
    label: 'Asia/Tokyo',
  },
  {
    value: '+9:30',
    label: 'Australia/Adelaide',
  },
  {
    value: '+9:30',
    label: 'Australia/Darwin',
  },
  {
    value: '+10:00',
    label: 'Asia/Yakutsk',
  },
  {
    value: '+10:00',
    label: 'Australia/Brisbane',
  },
  {
    value: '+10:00',
    label: 'Australia/Canberra',
  },
  {
    value: '+10:00',
    label: 'Pacific/Guam',
  },
  {
    value: '+10:00',
    label: 'Australia/Hobart',
  },
  {
    value: '+10:00',
    label: 'Australia/Melbourne',
  },
  {
    value: '+10:00',
    label: 'Pacific/Port_Moresby',
  },
  {
    value: '+10:00',
    label: 'Australia/Sydney',
  },
  {
    value: '+11:00',
    label: 'Asia/Vladivostok',
  },
  {
    value: '+12:00',
    label: 'Asia/Magadan',
  },
  {
    value: '+12:00',
    label: 'Pacific/Auckland',
  },
  {
    value: '+12:00',
    label: 'Pacific/Fiji',
  },
]

export default timezones
