const svgNS = 'http://www.w3.org/2000/svg';
const center = { x: 300, y: 300 };
const arenaRadius = 220;
const nodeRadius = 19;
const teamColors = [
  '#ffae42', '#18d38a', '#ff174e', '#4fa8ff', '#c77dff',
  '#f45da8', '#b5d94c', '#ff7043', '#36d5cf', '#e9d84f'
];
let fighterCount = 10;
const minimumFighters = 2;
const maximumFighters = 10;
const stringCount = 36;
const stringTouchRadius = nodeRadius + 2;
const arenaBounceBoost = 1.08;
const speedIncreasePerSecond = 2.5;
const maximumSpeed = 280;
const countryRecords = [
  ['Afghanistan', 'AF'], ['Albania', 'AL'], ['Algeria', 'DZ'], ['Andorra', 'AD'],
  ['Angola', 'AO'], ['Antigua and Barbuda', 'AG'], ['Argentina', 'AR'], ['Armenia', 'AM'],
  ['Australia', 'AU'], ['Austria', 'AT'], ['Azerbaijan', 'AZ'], ['Bahamas', 'BS'],
  ['Bahrain', 'BH'], ['Bangladesh', 'BD'], ['Barbados', 'BB'], ['Belarus', 'BY'],
  ['Belgium', 'BE'], ['Belize', 'BZ'], ['Benin', 'BJ'], ['Bhutan', 'BT'],
  ['Bolivia', 'BO'], ['Bosnia and Herzegovina', 'BA'], ['Botswana', 'BW'], ['Brazil', 'BR'],
  ['Brunei', 'BN'], ['Bulgaria', 'BG'], ['Burkina Faso', 'BF'], ['Burundi', 'BI'],
  ['Cabo Verde', 'CV'], ['Cambodia', 'KH'], ['Cameroon', 'CM'], ['Canada', 'CA'],
  ['Central African Republic', 'CF'], ['Chad', 'TD'], ['Chile', 'CL'], ['China', 'CN'],
  ['Colombia', 'CO'], ['Comoros', 'KM'], ['Costa Rica', 'CR'], ['Cote d’Ivoire', 'CI'],
  ['Croatia', 'HR'], ['Cuba', 'CU'], ['Cyprus', 'CY'], ['Czechia', 'CZ'],
  ['Democratic Republic of the Congo', 'CD'], ['Denmark', 'DK'], ['Djibouti', 'DJ'],
  ['Dominica', 'DM'], ['Dominican Republic', 'DO'], ['Ecuador', 'EC'], ['Egypt', 'EG'],
  ['El Salvador', 'SV'], ['Equatorial Guinea', 'GQ'], ['Eritrea', 'ER'], ['Estonia', 'EE'],
  ['Eswatini', 'SZ'], ['Ethiopia', 'ET'], ['Fiji', 'FJ'], ['Finland', 'FI'],
  ['France', 'FR'], ['Gabon', 'GA'], ['Gambia', 'GM'], ['Georgia', 'GE'],
  ['Germany', 'DE'], ['Ghana', 'GH'], ['Greece', 'GR'], ['Grenada', 'GD'],
  ['Guatemala', 'GT'], ['Guinea', 'GN'], ['Guinea-Bissau', 'GW'], ['Guyana', 'GY'],
  ['Haiti', 'HT'], ['Honduras', 'HN'], ['Hungary', 'HU'], ['Iceland', 'IS'],
  ['India', 'IN'], ['Indonesia', 'ID'], ['Iran', 'IR'], ['Iraq', 'IQ'],
  ['Ireland', 'IE'], ['Israel', 'IL'], ['Italy', 'IT'], ['Jamaica', 'JM'],
  ['Japan', 'JP'], ['Jordan', 'JO'], ['Kazakhstan', 'KZ'], ['Kenya', 'KE'],
  ['Kiribati', 'KI'], ['Kuwait', 'KW'], ['Kyrgyzstan', 'KG'], ['Laos', 'LA'],
  ['Latvia', 'LV'], ['Lebanon', 'LB'], ['Lesotho', 'LS'], ['Liberia', 'LR'],
  ['Libya', 'LY'], ['Liechtenstein', 'LI'], ['Lithuania', 'LT'], ['Luxembourg', 'LU'],
  ['Madagascar', 'MG'], ['Malawi', 'MW'], ['Malaysia', 'MY'], ['Maldives', 'MV'],
  ['Mali', 'ML'], ['Malta', 'MT'], ['Marshall Islands', 'MH'], ['Mauritania', 'MR'],
  ['Mauritius', 'MU'], ['Mexico', 'MX'], ['Micronesia', 'FM'], ['Moldova', 'MD'],
  ['Monaco', 'MC'], ['Mongolia', 'MN'], ['Montenegro', 'ME'], ['Morocco', 'MA'],
  ['Mozambique', 'MZ'], ['Myanmar', 'MM'], ['Namibia', 'NA'], ['Nauru', 'NR'],
  ['Nepal', 'NP'], ['Netherlands', 'NL'], ['New Zealand', 'NZ'], ['Nicaragua', 'NI'],
  ['Niger', 'NE'], ['Nigeria', 'NG'], ['North Korea', 'KP'], ['North Macedonia', 'MK'],
  ['Norway', 'NO'], ['Oman', 'OM'], ['Pakistan', 'PK'], ['Palau', 'PW'],
  ['Palestine', 'PS'], ['Panama', 'PA'], ['Papua New Guinea', 'PG'], ['Paraguay', 'PY'],
  ['Peru', 'PE'], ['Philippines', 'PH'], ['Poland', 'PL'], ['Portugal', 'PT'],
  ['Qatar', 'QA'], ['Republic of the Congo', 'CG'], ['Romania', 'RO'], ['Russia', 'RU'],
  ['Rwanda', 'RW'], ['Saint Kitts and Nevis', 'KN'], ['Saint Lucia', 'LC'],
  ['Saint Vincent and the Grenadines', 'VC'], ['Samoa', 'WS'], ['San Marino', 'SM'],
  ['Sao Tome and Principe', 'ST'], ['Saudi Arabia', 'SA'], ['Senegal', 'SN'],
  ['Serbia', 'RS'], ['Seychelles', 'SC'], ['Sierra Leone', 'SL'], ['Singapore', 'SG'],
  ['Slovakia', 'SK'], ['Slovenia', 'SI'], ['Solomon Islands', 'SB'], ['Somalia', 'SO'],
  ['South Africa', 'ZA'], ['South Korea', 'KR'], ['South Sudan', 'SS'], ['Spain', 'ES'],
  ['Sri Lanka', 'LK'], ['Sudan', 'SD'], ['Suriname', 'SR'], ['Sweden', 'SE'],
  ['Switzerland', 'CH'], ['Syria', 'SY'], ['Taiwan', 'TW'], ['Tajikistan', 'TJ'],
  ['Tanzania', 'TZ'], ['Thailand', 'TH'], ['Timor-Leste', 'TL'], ['Togo', 'TG'],
  ['Tonga', 'TO'], ['Trinidad and Tobago', 'TT'], ['Tunisia', 'TN'], ['Turkey', 'TR'],
  ['Turkmenistan', 'TM'], ['Tuvalu', 'TV'], ['Uganda', 'UG'], ['Ukraine', 'UA'],
  ['United Arab Emirates', 'AE'], ['United Kingdom', 'GB'], ['United States', 'US'],
  ['Uruguay', 'UY'], ['Uzbekistan', 'UZ'], ['Vanuatu', 'VU'], ['Vatican City', 'VA'],
  ['Venezuela', 'VE'], ['Vietnam', 'VN'], ['Yemen', 'YE'], ['Zambia', 'ZM'],
  ['Zimbabwe', 'ZW'], ['Kosovo', 'XK']
];
const countries = countryRecords.map(([name, code]) => ({
  name,
  code,
}));
const leaders = window.currentLeaderRoster;
const pickerContainer = document.getElementById('countryPickers');
const selects = [];
const pickerButtons = [];
const fighterCountOutput = document.getElementById('fighterCount');
const decreaseCountButton = document.getElementById('decreaseCount');
const increaseCountButton = document.getElementById('increaseCount');
const countryMenu = document.getElementById('countryMenu');
const countrySearch = document.getElementById('countrySearch');
const countryOptions = document.getElementById('countryOptions');
const countdownElement = document.getElementById('countdown');
const soundToggle = document.getElementById('soundToggle');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const selectionModeSelect = document.getElementById('selectionMode');
const toggleCountrySelectionButton = document.getElementById('toggleCountrySelection');
const portraitCredits = document.getElementById('portraitCredits');
const portraitCreditsList = document.getElementById('portraitCreditsList');
const leaderDataSourceElement = document.getElementById('leaderDataSource');
let selectedCountryNames = [
  'India',
  'Pakistan',
  'United States',
  'China',
  'Brazil',
  'Japan',
  'France',
  'Germany',
  'United Kingdom',
  'Canada'
];
const fightersElement = document.getElementById('fighters');
const linesGroup = document.getElementById('string-lines');
const statusElement = document.getElementById('gameStatus');
const startButton = document.getElementById('startButton');

let fighters = [];
let isPlaying = false;
let lastFrameTime = 0;
let elapsedTime = 0;
let animationFrame = 0;
let menuPlayerIndex = -1;
let countdownRun = 0;
let soundEnabled = true;
let gameAudioContext = null;
let lastBounceSoundAt = -Infinity;
let lastCutSoundAt = -Infinity;
let isCountingDown = false;
let selectionMode = 'countries';
let selectedLeaderIds = leaders.slice(0, 10).map((leader) => leader.id);

function isLeaderMode() {
  return selectionMode === 'leaders';
}

function getActiveChoices() {
  return isLeaderMode() ? leaders : countries;
}

function getChoiceId(choice) {
  return isLeaderMode() ? choice.id : choice.name;
}

function getSelectedChoiceIds() {
  return isLeaderMode() ? selectedLeaderIds : selectedCountryNames;
}

function saveSelectedChoices() {
  const savedChoices = getSelectedChoiceIds();
  savedChoices.splice(0, savedChoices.length, ...selects.map((select) => select.value));
}

function getChoiceImage(choice) {
  return isLeaderMode()
    ? choice.image
    : `flags/${choice.code.toLowerCase()}.png`;
}

function getChoiceSubtitle(choice) {
  return isLeaderMode() ? `${choice.office} · ${choice.country}` : '';
}

function populatePortraitCredits() {
  const sourceLink = document.createElement('a');
  sourceLink.href = window.currentLeaderSource;
  sourceLink.target = '_blank';
  sourceLink.rel = 'noopener noreferrer';
  sourceLink.textContent = 'current heads of state and government list';
  leaderDataSourceElement.replaceChildren(
    document.createTextNode(`Roster source (checked ${window.currentLeaderDataChecked}): `),
    sourceLink,
    document.createTextNode('. Portrait credits and license links:')
  );

  portraitCreditsList.replaceChildren();
  leaders.forEach((leader) => {
    const item = document.createElement('li');
    const sourceLink = document.createElement('a');
    sourceLink.href = leader.source;
    sourceLink.target = '_blank';
    sourceLink.rel = 'noopener noreferrer';
    sourceLink.textContent = 'image source';
    const licenseLink = document.createElement('a');
    licenseLink.href = leader.licenseUrl;
    licenseLink.target = '_blank';
    licenseLink.rel = 'noopener noreferrer';
    licenseLink.textContent = leader.license;
    const credit = leader.credit === 'Unknown authorUnknown author'
      ? 'Unknown author'
      : leader.credit;
    item.append(
      document.createTextNode(`${leader.name} — ${credit}; `),
      sourceLink,
      document.createTextNode(' · '),
      licenseLink
    );
    portraitCreditsList.appendChild(item);
  });
}

function populateSelectors() {
  const choices = getActiveChoices();
  const savedChoices = getSelectedChoiceIds();
  pickerContainer.setAttribute('aria-label', `Choose ${isLeaderMode() ? 'leaders' : 'countries'}`);
  pickerContainer.replaceChildren();
  selects.length = 0;
  pickerButtons.length = 0;
  for (let index = 0; index < fighterCount; index += 1) {
    const label = document.createElement('label');
    label.className = 'country-picker';
    label.style.setProperty('--team-color', teamColors[index]);

    const heading = document.createElement('span');
    heading.className = 'picker-label';

    const dot = document.createElement('span');
    dot.className = 'team-dot';

    const flag = document.createElement('span');
    flag.className = 'picker-flag';
    flag.id = `pickerFlag${index + 1}`;

    const playerName = document.createElement('span');
    playerName.textContent = `Player ${index + 1}`;
    heading.append(dot, flag, playerName);

    const choiceButton = document.createElement('button');
    choiceButton.className = 'country-button';
    choiceButton.classList.toggle('leader-choice', isLeaderMode());
    choiceButton.type = 'button';
    choiceButton.setAttribute('aria-label', `Choose player ${index + 1}`);
    choiceButton.setAttribute('aria-haspopup', 'listbox');
    choiceButton.setAttribute('aria-expanded', 'false');
    choiceButton.innerHTML = '<img alt=""><span></span>';
    choiceButton.addEventListener('click', () => openCountryMenu(index, choiceButton));

    const select = document.createElement('select');
    select.id = `country${index + 1}`;
    select.setAttribute('aria-label', `Select player ${index + 1}`);
    select.hidden = true;
    label.append(heading, choiceButton, select);
    pickerContainer.appendChild(label);
    selects.push(select);
    pickerButtons.push(choiceButton);

    choices.forEach((choice) => {
      const option = document.createElement('option');
      option.value = getChoiceId(choice);
      option.textContent = isLeaderMode()
        ? `${choice.name} — ${getChoiceSubtitle(choice)}`
        : choice.name;
      select.appendChild(option);
    });
    select.value = savedChoices[index] || getChoiceId(choices[index]);
    select.addEventListener('change', handleChoiceChange);
  }
  updateAvailableChoices();
  updatePickerChoices();
  fighterCountOutput.textContent = String(fighterCount);
  updateCountControls();
}

function handleChoiceChange(event) {
  const changedIndex = selects.indexOf(event.currentTarget);
  const chosen = event.currentTarget.value;
  const choices = getActiveChoices();
  selects.forEach((select, index) => {
    if (index !== changedIndex && select.value === chosen) {
      const replacement = choices.find(
        (choice) => !selects.some(
          (other, otherIndex) => otherIndex !== index && other.value === getChoiceId(choice)
        )
      );
      if (replacement) {
        select.value = getChoiceId(replacement);
      }
    }
  });
  saveSelectedChoices();
  updateAvailableChoices();
  updatePickerChoices();
  renderIdleFighters();
}

function updateAvailableChoices() {
  selects.forEach((select, index) => {
    Array.from(select.options).forEach((option) => {
      option.disabled =
        option.value !== select.value &&
        selects.some((other, otherIndex) => otherIndex !== index && other.value === option.value);
    });
  });
}

function updateCountControls() {
  const controlsDisabled = isPlaying || isCountingDown;
  decreaseCountButton.disabled = controlsDisabled || fighterCount <= minimumFighters;
  increaseCountButton.disabled = controlsDisabled || fighterCount >= maximumFighters;
  selectionModeSelect.disabled = controlsDisabled;
  selects.forEach((select) => {
    select.disabled = controlsDisabled;
  });
  pickerButtons.forEach((button) => {
    button.disabled = controlsDisabled;
  });
}

function updatePickerChoices() {
  const choices = getActiveChoices();
  selects.forEach((select, index) => {
    const choice = choices.find((item) => getChoiceId(item) === select.value);
    const preview = document.getElementById(`pickerFlag${index + 1}`);
    const button = pickerButtons[index];
    if (!choice || !preview || !button) return;

    const imageSource = getChoiceImage(choice);
    preview.replaceChildren();
    const previewImage = document.createElement('img');
    previewImage.src = imageSource;
    previewImage.alt = '';
    preview.appendChild(previewImage);

    const image = button.querySelector('img');
    const name = button.querySelector('span');
    image.src = imageSource;
    image.alt = '';
    name.textContent = choice.name;
    button.setAttribute(
      'aria-label',
      `Player ${index + 1}: ${choice.name}${getChoiceSubtitle(choice) ? `, ${getChoiceSubtitle(choice)}` : ''}. Choose a different ${isLeaderMode() ? 'leader' : 'country'}.`
    );
  });
}

function renderCountryOptions(query = '') {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const selectedByOtherPlayers = new Set(
    selects.filter((_, index) => index !== menuPlayerIndex).map((select) => select.value)
  );
  const choices = getActiveChoices();
  countryOptions.replaceChildren();

  choices
    .filter((choice) => {
      const searchableText = `${choice.name} ${choice.office || ''} ${choice.country || ''}`;
      return searchableText.toLocaleLowerCase().includes(normalizedQuery);
    })
    .forEach((choice) => {
      const choiceId = getChoiceId(choice);
      const option = document.createElement('button');
      option.className = 'country-option';
      option.classList.toggle('leader-choice', isLeaderMode());
      option.type = 'button';
      option.setAttribute('role', 'option');
      option.disabled = selectedByOtherPlayers.has(choiceId);

      const image = document.createElement('img');
      image.src = getChoiceImage(choice);
      image.alt = '';
      option.appendChild(image);

      const choiceLabel = document.createElement('span');
      choiceLabel.className = 'choice-label';
      const name = document.createElement('strong');
      name.textContent = choice.name;
      choiceLabel.appendChild(name);
      if (isLeaderMode()) {
        const subtitle = document.createElement('small');
        subtitle.textContent = getChoiceSubtitle(choice);
        choiceLabel.appendChild(subtitle);
      }
      option.appendChild(choiceLabel);

      option.addEventListener('click', () => {
        const select = selects[menuPlayerIndex];
        if (!select || option.disabled) return;
        select.value = choiceId;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        closeCountryMenu();
      });
      countryOptions.appendChild(option);
    });

  if (!countryOptions.childElementCount) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'choice-empty';
    emptyMessage.textContent = `No ${isLeaderMode() ? 'leaders' : 'countries'} found.`;
    countryOptions.appendChild(emptyMessage);
  }
}

function openCountryMenu(playerIndex, button) {
  if (isPlaying || isCountingDown) return;
  menuPlayerIndex = playerIndex;
  button.setAttribute('aria-expanded', 'true');
  countryMenu.setAttribute('aria-label', `Select a ${isLeaderMode() ? 'leader' : 'country'}`);
  countrySearch.placeholder = `Search ${isLeaderMode() ? 'leaders' : 'countries'}...`;
  countryMenu.hidden = false;
  const bounds = button.getBoundingClientRect();
  const menuWidth = Math.min(300, window.innerWidth - 32);
  const left = Math.max(16, Math.min(bounds.left, window.innerWidth - menuWidth - 16));
  const menuHeight = Math.min(340, window.innerHeight * 0.55);
  const top = bounds.bottom + menuHeight > window.innerHeight - 12
    ? Math.max(12, bounds.top - menuHeight - 8)
    : bounds.bottom + 6;
  countryMenu.style.left = `${left}px`;
  countryMenu.style.top = `${top}px`;
  countrySearch.value = '';
  renderCountryOptions();
  countrySearch.focus();
}

function closeCountryMenu() {
  if (menuPlayerIndex >= 0) {
    pickerButtons[menuPlayerIndex]?.setAttribute('aria-expanded', 'false');
  }
  countryMenu.hidden = true;
  menuPlayerIndex = -1;
}

function showCountdown(value) {
  countdownElement.hidden = true;
  countdownElement.textContent = value;
  void countdownElement.offsetWidth;
  countdownElement.hidden = false;
}

function updateFighterCount(change) {
  if (isPlaying || isCountingDown) return;
  const nextCount = Math.max(minimumFighters, Math.min(maximumFighters, fighterCount + change));
  if (nextCount === fighterCount) return;
  fighterCount = nextCount;
  saveSelectedChoices();
  const selectedChoices = getSelectedChoiceIds();
  const choices = getActiveChoices();
  while (selectedChoices.length < fighterCount) {
    const next = choices.find((choice) => !selectedChoices.includes(getChoiceId(choice)));
    if (!next) break;
    selectedChoices.push(getChoiceId(next));
  }
  selectedChoices.length = fighterCount;
  closeCountryMenu();
  populateSelectors();
  renderIdleFighters();
}

function getSelectedChoices() {
  const choices = getActiveChoices();
  return selects.map((select) => choices.find((choice) => getChoiceId(choice) === select.value));
}

function makeChoiceImage(choice) {
  const image = document.createElement('img');
  image.className = 'flag-art';
  image.src = getChoiceImage(choice);
  image.alt = `${choice.name} ${isLeaderMode() ? 'portrait' : 'flag'}`;
  return image;
}

function makeLegacyFlagSvg(country, index) {
  const clipId = `flag-clip-${index}-${flagSvgSerial++}`;
  let design = '';

  switch (country.name) {
    case 'India':
      design = '<rect width="36" height="12" fill="#ff9933"/><rect y="12" width="36" height="12" fill="#fff"/><rect y="24" width="36" height="12" fill="#138808"/><circle cx="18" cy="18" r="4.2" fill="none" stroke="#000080" stroke-width="1.5"/><path d="M18 12.8v10.4M12.8 18h10.4M14.3 14.3l7.4 7.4m0-7.4-7.4 7.4" stroke="#000080" stroke-width=".8"/>';
      break;
    case 'Pakistan':
      design = '<rect width="36" height="36" fill="#01411c"/><rect width="8" height="36" fill="#fff"/><circle cx="22" cy="18" r="9" fill="#fff"/><circle cx="25.5" cy="15.5" r="8" fill="#01411c"/><path d="m29 10 .8 2.2 2.3.1-1.8 1.4.6 2.2-1.9-1.3-1.9 1.3.7-2.2-1.8-1.4 2.3-.1z" fill="#fff"/>';
      break;
    case 'United States':
      design = '<rect width="36" height="36" fill="#fff"/><path d="M0 0h36v3H0zm0 6h36v3H0zm0 6h36v3H0zm0 6h36v3H0zm0 6h36v3H0zm0 6h36v3H0z" fill="#b22234"/><path d="M0 0h17v19H0z" fill="#3c3b6e"/><g fill="#fff"><circle cx="4" cy="4" r="1"/><circle cx="9" cy="4" r="1"/><circle cx="14" cy="4" r="1"/><circle cx="6.5" cy="9" r="1"/><circle cx="11.5" cy="9" r="1"/><circle cx="4" cy="14" r="1"/><circle cx="9" cy="14" r="1"/><circle cx="14" cy="14" r="1"/></g>';
      break;
    case 'China':
      design = '<rect width="36" height="36" fill="#de2910"/><path d="m9 5 1.5 4.2 4.5.1-3.6 2.7 1.3 4.3L9 13.7l-3.7 2.6 1.3-4.3L3 9.3l4.5-.1z" fill="#ffde00"/><circle cx="18" cy="6" r="1.2" fill="#ffde00"/><circle cx="22" cy="10" r="1.2" fill="#ffde00"/><circle cx="22" cy="15" r="1.2" fill="#ffde00"/><circle cx="18" cy="19" r="1.2" fill="#ffde00"/>';
      break;
    case 'Brazil':
      design = '<rect width="36" height="36" fill="#009739"/><path d="m18 4 14 14-14 14L4 18z" fill="#ffdf00"/><circle cx="18" cy="18" r="7" fill="#002776"/><path d="M11.5 17a12 12 0 0 1 13 2" fill="none" stroke="#fff" stroke-width="1.4"/>';
      break;
    case 'Japan':
      design = '<rect width="36" height="36" fill="#fff"/><circle cx="18" cy="18" r="8" fill="#bc002d"/>';
      break;
    case 'France':
      design = '<rect width="12" height="36" fill="#002395"/><rect x="12" width="12" height="36" fill="#fff"/><rect x="24" width="12" height="36" fill="#ed2939"/>';
      break;
    case 'Germany':
      design = '<rect width="36" height="12" fill="#000"/><rect y="12" width="36" height="12" fill="#dd0000"/><rect y="24" width="36" height="12" fill="#ffce00"/>';
      break;
    case 'United Kingdom':
      design = '<rect width="36" height="36" fill="#012169"/><path d="m0 0 36 36M36 0 0 36" stroke="#fff" stroke-width="8"/><path d="m0 0 36 36M36 0 0 36" stroke="#c8102e" stroke-width="3"/><path d="M18 0v36M0 18h36" stroke="#fff" stroke-width="11"/><path d="M18 0v36M0 18h36" stroke="#c8102e" stroke-width="5"/>';
      break;
    case 'Canada':
      design = '<rect width="9" height="36" fill="#d80621"/><rect x="9" width="18" height="36" fill="#fff"/><rect x="27" width="9" height="36" fill="#d80621"/><path d="m18 9 2.4 5 3.6-1-2 4 2 2-4 1-2 6-2-6-4-1 2-2-2-4 3.6 1z" fill="#d80621"/>';
      break;
    case 'Turkey':
      design = '<rect width="36" height="36" fill="#e30a17"/><circle cx="15" cy="18" r="9" fill="#fff"/><circle cx="18.5" cy="16" r="7" fill="#e30a17"/><path d="m25 12 .9 2.4 2.5.1-2 1.5.7 2.5-2.1-1.5-2.1 1.5.7-2.5-2-1.5 2.5-.1z" fill="#fff"/>';
      break;
    case 'Italy':
      design = '<rect width="12" height="36" fill="#009246"/><rect x="12" width="12" height="36" fill="#fff"/><rect x="24" width="12" height="36" fill="#ce2b37"/>';
      break;
    case 'Mexico':
      design = '<rect width="12" height="36" fill="#006847"/><rect x="12" width="12" height="36" fill="#fff"/><rect x="24" width="12" height="36" fill="#ce1126"/><circle cx="18" cy="19" r="2" fill="#8c6239"/>';
      break;
    case 'Australia':
      design = '<rect width="36" height="36" fill="#00008b"/><path d="m0 0 16 16M16 0 0 16" stroke="#fff" stroke-width="4"/><path d="m0 0 16 16M16 0 0 16" stroke="#c8102e" stroke-width="1.5"/><path d="M8 0v16M0 8h16" stroke="#fff" stroke-width="5"/><path d="M8 0v16M0 8h16" stroke="#c8102e" stroke-width="2"/><circle cx="25" cy="24" r="2" fill="#fff"/><circle cx="30" cy="15" r="1.5" fill="#fff"/><circle cx="22" cy="11" r="1.5" fill="#fff"/>';
      break;
    case 'South Korea':
      design = '<rect width="36" height="36" fill="#fff"/><path d="M18 10a8 8 0 0 1 0 16 4 4 0 0 0 0-8 4 4 0 0 1 0-8" fill="#cd2e3a"/><path d="M18 26a8 8 0 0 1 0-16 4 4 0 0 0 0 8 4 4 0 0 1 0 8" fill="#0047a0"/>';
      break;
  }

  if (!design) {
    return `<span class="flag-emoji" aria-hidden="true">${country.flag}</span>`;
  }
  return `<svg class="flag-art" viewBox="0 0 36 36" aria-hidden="true"><defs><clipPath id="${clipId}"><circle cx="18" cy="18" r="18"/></clipPath></defs><g clip-path="url(#${clipId})">${design}</g></svg>`;
}

function updatePickerFlagsLegacy() {
  selects.forEach((select, index) => {
    const country = countries.find((item) => item.name === select.value);
    const preview = document.getElementById(`pickerFlag${index + 1}`);
    if (country && preview) {
      preview.innerHTML = makeFlagSvg(country, index + 3);
    }
  });
}

function createFighter(choice, index) {
  const element = document.createElement('div');
  element.className = 'fighter';
  element.style.setProperty('--team-color', teamColors[index]);
  element.setAttribute('aria-label', choice.name);
  element.appendChild(makeChoiceImage(choice));
  fightersElement.appendChild(element);

  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / fighterCount;
  const distance = 72 + Math.random() * 24;
  const speed = 70 + Math.random() * 20;
  const sectorCenter = angle;
  const sectorWidth = (Math.PI * 2) / fighterCount;

  return {
    choice,
    index,
    element,
    x: center.x + Math.cos(angle) * distance,
    y: center.y + Math.sin(angle) * distance,
    previousX: center.x + Math.cos(angle) * distance,
    previousY: center.y + Math.sin(angle) * distance,
    vx: Math.cos(angle + Math.PI * 0.8) * speed,
    vy: Math.sin(angle + Math.PI * 0.8) * speed,
    lines: Array.from({ length: stringCount }, (_, lineIndex) => ({
      angle:
        sectorCenter -
        sectorWidth * 0.48 +
        ((sectorWidth * 0.96) * lineIndex) / (stringCount - 1),
      cut: false
    })),
    lastCutAt: -Infinity,
    alive: true
  };
}

function clearLines() {
  linesGroup.replaceChildren();
}

function drawFan(fighter) {
  const group = document.createElementNS(svgNS, 'g');
  const stroke = teamColors[fighter.index];

  fighter.lines.forEach((tether) => {
    if (tether.cut) return;
    const endX = center.x + Math.cos(tether.angle) * arenaRadius;
    const endY = center.y + Math.sin(tether.angle) * arenaRadius;
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', fighter.x);
    line.setAttribute('y1', fighter.y);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);
    line.setAttribute('stroke', stroke);
    line.setAttribute('stroke-width', tether.edgeAttached ? '0.8' : '0.55');
    line.setAttribute('opacity', fighter.alive ? (tether.edgeAttached ? '1' : '0.78') : '0.14');
    group.appendChild(line);
  });

  linesGroup.appendChild(group);
}

function render() {
  clearLines();
  const size = document.querySelector('.arena-wrap').getBoundingClientRect();
  const scale = size.width / 440;

  fighters.forEach((fighter) => {
    drawFan(fighter);
    fighter.element.style.left = `${((fighter.x - 80) / 440) * 100}%`;
    fighter.element.style.top = `${((fighter.y - 80) / 440) * 100}%`;
    fighter.element.style.width = `${Math.max(26, nodeRadius * 2 * scale)}px`;
    fighter.element.style.height = fighter.element.style.width;
    fighter.element.style.fontSize = `${Math.max(15, nodeRadius * 1.15 * scale)}px`;
    fighter.element.classList.toggle('is-out', !fighter.alive);
  });
}

function getAudioContext() {
  if (!soundEnabled || !window.AudioContext) return null;
  if (!gameAudioContext) gameAudioContext = new window.AudioContext();
  if (gameAudioContext.state === 'suspended') {
    gameAudioContext
      .resume()
      .catch((error) => console.error('Could not resume game audio:', error));
  }
  return gameAudioContext;
}

function playTone(frequency, duration = 0.12, waveform = 'sine', volume = 0.045) {
  const context = getAudioContext();
  if (!context) return;

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;
  oscillator.type = waveform;
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function bounceOffWall(fighter) {
  const dx = fighter.x - center.x;
  const dy = fighter.y - center.y;
  const distance = Math.hypot(dx, dy);
  const maxDistance = arenaRadius - nodeRadius;
  if (distance < maxDistance) return;

  const nx = dx / (distance || 1);
  const ny = dy / (distance || 1);
  fighter.x = center.x + nx * maxDistance;
  fighter.y = center.y + ny * maxDistance;
  const velocityAlongNormal = fighter.vx * nx + fighter.vy * ny;
  if (velocityAlongNormal > 0) {
    const contactAngle = Math.atan2(ny, nx);
    const alreadyAttached = fighter.lines.some(
      (line) =>
        line.edgeAttached &&
        !line.cut &&
        Math.abs(Math.atan2(Math.sin(line.angle - contactAngle), Math.cos(line.angle - contactAngle))) <
          0.045
    );

    if (!alreadyAttached) {
      fighter.lines.push({ angle: contactAngle, cut: false, edgeAttached: true });
    }

    fighter.vx -= 2 * velocityAlongNormal * nx;
    fighter.vy -= 2 * velocityAlongNormal * ny;
    fighter.vx *= arenaBounceBoost;
    fighter.vy *= arenaBounceBoost;
    const now = performance.now();
    if (now - lastBounceSoundAt > 90) {
      lastBounceSoundAt = now;
      playTone(180 + Math.min(100, speedIncreasePerSecond * elapsedTime / 1000), 0.07, 'triangle', 0.025);
    }
    const speed = Math.hypot(fighter.vx, fighter.vy);
    if (speed > maximumSpeed) {
      fighter.vx = (fighter.vx / speed) * maximumSpeed;
      fighter.vy = (fighter.vy / speed) * maximumSpeed;
    }
  }
}

function bounceFighters() {
  const active = fighters.filter((fighter) => fighter.alive);
  for (let firstIndex = 0; firstIndex < active.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < active.length; secondIndex += 1) {
      const first = active[firstIndex];
      const second = active[secondIndex];
      let dx = second.x - first.x;
      let dy = second.y - first.y;
      let distance = Math.hypot(dx, dy);
      const minimumDistance = nodeRadius * 2;
      if (distance >= minimumDistance) continue;
      if (distance < 0.001) {
        const angle = Math.random() * Math.PI * 2;
        dx = Math.cos(angle) * 0.001;
        dy = Math.sin(angle) * 0.001;
        distance = 0.001;
      }

      const nx = dx / distance;
      const ny = dy / distance;
      const overlap = minimumDistance - distance;
      first.x -= nx * overlap * 0.5;
      first.y -= ny * overlap * 0.5;
      second.x += nx * overlap * 0.5;
      second.y += ny * overlap * 0.5;

      const relativeVelocity = (second.vx - first.vx) * nx + (second.vy - first.vy) * ny;
      if (relativeVelocity < 0) {
        first.vx += relativeVelocity * nx;
        first.vy += relativeVelocity * ny;
        second.vx -= relativeVelocity * nx;
        second.vy -= relativeVelocity * ny;
      }
    }
  }
}

function pointToSegmentDistance(pointX, pointY, startX, startY, endX, endY) {
  const segmentX = endX - startX;
  const segmentY = endY - startY;
  const segmentLengthSquared = segmentX * segmentX + segmentY * segmentY;
  const projection = Math.max(
    0,
    Math.min(
      1,
      ((pointX - startX) * segmentX + (pointY - startY) * segmentY) /
        segmentLengthSquared
    )
  );
  const nearestX = startX + projection * segmentX;
  const nearestY = startY + projection * segmentY;
  return Math.hypot(pointX - nearestX, pointY - nearestY);
}

function segmentToSegmentDistance(ax, ay, bx, by, cx, cy, dx, dy) {
  const movementX = bx - ax;
  const movementY = by - ay;
  const tetherX = dx - cx;
  const tetherY = dy - cy;
  const denominator = movementX * tetherY - movementY * tetherX;

  if (Math.abs(denominator) > 0.000001) {
    const offsetX = cx - ax;
    const offsetY = cy - ay;
    const movementPosition = (offsetX * tetherY - offsetY * tetherX) / denominator;
    const tetherPosition = (offsetX * movementY - offsetY * movementX) / denominator;
    if (
      movementPosition >= 0 &&
      movementPosition <= 1 &&
      tetherPosition >= 0 &&
      tetherPosition <= 1
    ) {
      return 0;
    }
  }

  return Math.min(
    pointToSegmentDistance(ax, ay, cx, cy, dx, dy),
    pointToSegmentDistance(bx, by, cx, cy, dx, dy),
    pointToSegmentDistance(cx, cy, ax, ay, bx, by),
    pointToSegmentDistance(dx, dy, ax, ay, bx, by)
  );
}

function cutOpponentLines() {
  const attackers = fighters.filter((fighter) => fighter.alive);

  attackers.forEach((attacker) => {
    if (!attacker.alive) return;
    let cutCount = 0;
    let eliminatedTarget = null;
    fighters.forEach((target) => {
      if (!target.alive || target === attacker) return;
      target.lines.forEach((tether) => {
        if (tether.cut) return;
        const endX = center.x + Math.cos(tether.angle) * arenaRadius;
        const endY = center.y + Math.sin(tether.angle) * arenaRadius;
        const distance = segmentToSegmentDistance(
          attacker.previousX,
          attacker.previousY,
          attacker.x,
          attacker.y,
          target.x,
          target.y,
          endX,
          endY
        );
        if (distance <= stringTouchRadius) {
          tether.cut = true;
          cutCount += 1;
        }
      });

      const remainingLines = target.lines.filter((line) => !line.cut).length;
      if (remainingLines === 0) {
        target.alive = false;
        target.element.setAttribute(
          'aria-label',
          `${target.choice.name}, all strings cut`
        );
        eliminatedTarget = target;
      }
    });

    if (cutCount > 0) {
      attacker.element.classList.remove('is-hit');
      void attacker.element.offsetWidth;
      attacker.element.classList.add('is-hit');
      const now = performance.now();
      if (now - lastCutSoundAt > 100) {
        lastCutSoundAt = now;
        playTone(640 + Math.min(240, cutCount * 15), 0.075, 'sawtooth', 0.018);
      }
    }
    if (eliminatedTarget) {
      statusElement.textContent = `${attacker.choice.name} cut every string of ${eliminatedTarget.choice.name}!`;
    }
  });
}

function updateStatus() {
  const remaining = fighters.filter((fighter) => fighter.alive);
  if (remaining.length <= 1) {
    isPlaying = false;
    const winner = remaining[0];
    statusElement.textContent = winner
      ? `${winner.choice.name} wins!`
      : 'It is a draw!';
    startButton.textContent = 'Fight again';
    updateCountControls();
    return true;
  }

  const totalStrings = remaining.reduce(
    (count, fighter) => count + fighter.lines.filter((line) => !line.cut).length,
    0
  );
  const participantType = isLeaderMode() ? 'leaders' : 'flags';
  statusElement.textContent = `${remaining.length} ${participantType} fighting · ${totalStrings} strings left`;
  return false;
}

function frame(timestamp) {
  const delta = Math.min((timestamp - (lastFrameTime || timestamp)) / 1000, 0.032);
  const simulationDelta = delta * Number(speedSlider.value) / 100;
  lastFrameTime = timestamp;
  elapsedTime += simulationDelta * 1000;

  if (isPlaying) {
    fighters.forEach((fighter) => {
      if (!fighter.alive) return;
      const speed = Math.hypot(fighter.vx, fighter.vy);
      if (speed < maximumSpeed) {
        const increasedSpeed = Math.min(maximumSpeed, speed + speedIncreasePerSecond * simulationDelta);
        fighter.vx = (fighter.vx / (speed || 1)) * increasedSpeed;
        fighter.vy = (fighter.vy / (speed || 1)) * increasedSpeed;
      }
      fighter.previousX = fighter.x;
      fighter.previousY = fighter.y;
      fighter.x += fighter.vx * simulationDelta;
      fighter.y += fighter.vy * simulationDelta;
      bounceOffWall(fighter);
    });
    bounceFighters();
    cutOpponentLines();
    if (updateStatus()) {
      render();
      return;
    }
  }

  render();
  animationFrame = window.requestAnimationFrame(frame);
}

function renderIdleFighters() {
  fightersElement.replaceChildren();
  countdownElement.hidden = true;
  fighters = getSelectedChoices().map((choice, index) => createFighter(choice, index));
  fighters.forEach((fighter) => {
    fighter.vx = 0;
    fighter.vy = 0;
    fighter.lines.forEach((line) => {
      line.cut = false;
    });
    fighter.alive = true;
    fighter.element.setAttribute('aria-label', fighter.choice.name);
  });
  const participantType = isLeaderMode() ? 'leaders' : 'countries';
  statusElement.textContent = `Choose ${fighterCount} ${participantType}, then start the fight.`;
  startButton.textContent = 'Start fight';
  startButton.disabled = false;
  isCountingDown = false;
  updateCountControls();
  render();
}

async function startFight() {
  window.cancelAnimationFrame(animationFrame);
  closeCountryMenu();
  const run = ++countdownRun;
  fightersElement.replaceChildren();
  fighters = getSelectedChoices().map((choice, index) => createFighter(choice, index));
  fighters.forEach((fighter) => {
    fighter.vx = 0;
    fighter.vy = 0;
    fighter.lines.forEach((line) => {
      line.cut = false;
    });
    fighter.alive = true;
    fighter.element.setAttribute('aria-label', fighter.choice.name);
  });
  isPlaying = false;
  isCountingDown = true;
  lastFrameTime = 0;
  elapsedTime = 0;
  startButton.disabled = true;
  startButton.textContent = 'Get ready';
  updateCountControls();
  render();

  for (let number = 3; number > 0; number -= 1) {
    if (run !== countdownRun) return;
    showCountdown(String(number));
    statusElement.textContent = `Fight starts in ${number}…`;
    playTone(440 + (3 - number) * 100, 0.16, 'sine', 0.06);
    await new Promise((resolve) => window.setTimeout(resolve, 700));
  }

  if (run !== countdownRun) return;
  showCountdown('GO!');
  statusElement.textContent = 'Fight!';
  playTone(880, 0.28, 'triangle', 0.07);
  await new Promise((resolve) => window.setTimeout(resolve, 350));
  if (run !== countdownRun) return;

  countdownElement.hidden = true;
  isCountingDown = false;
  isPlaying = true;
  fighters.forEach((fighter) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 105 + Math.random() * 30;
    fighter.vx = Math.cos(angle) * speed;
    fighter.vy = Math.sin(angle) * speed;
  });
  startButton.disabled = false;
  startButton.textContent = 'Restart fight';
  updateCountControls();
  animationFrame = window.requestAnimationFrame(frame);
}

  populatePortraitCredits();
  portraitCredits.hidden = !isLeaderMode();
  populateSelectors();
renderIdleFighters();
startButton.addEventListener('click', startFight);
toggleCountrySelectionButton.addEventListener('click', () => {
  const isExpanded = toggleCountrySelectionButton.getAttribute('aria-expanded') === 'true';
  pickerContainer.hidden = isExpanded;
  toggleCountrySelectionButton.setAttribute('aria-expanded', String(!isExpanded));
  toggleCountrySelectionButton.textContent = isExpanded
    ? 'Show country selection'
    : 'Hide country selection';
});
decreaseCountButton.addEventListener('click', () => updateFighterCount(-1));
increaseCountButton.addEventListener('click', () => updateFighterCount(1));
countrySearch.addEventListener('input', () => renderCountryOptions(countrySearch.value));
selectionModeSelect.addEventListener('change', () => {
  if (isPlaying || isCountingDown) {
    selectionModeSelect.value = selectionMode;
    return;
  }
  selectionMode = selectionModeSelect.value;
  closeCountryMenu();
  portraitCredits.hidden = !isLeaderMode();
  populateSelectors();
  renderIdleFighters();
});
soundToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundToggle.textContent = `Sound: ${soundEnabled ? 'On' : 'Off'}`;
  soundToggle.setAttribute('aria-pressed', String(soundEnabled));
  if (soundEnabled) playTone(660, 0.1, 'sine', 0.04);
});
speedSlider.addEventListener('input', () => {
  speedValue.textContent = `${speedSlider.value}%`;
});
document.addEventListener('pointerdown', (event) => {
  if (!countryMenu.hidden && !countryMenu.contains(event.target) && !pickerContainer.contains(event.target)) {
    closeCountryMenu();
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !countryMenu.hidden) closeCountryMenu();
});
animationFrame = window.requestAnimationFrame(frame);
