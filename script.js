"use strict";

// トラブル対応データ。将来API連携する場合も、この形へ正規化すれば描画処理を流用できます。
const sensorNotOnTrouble = {
  id: "sensor_not_on",
  title: "センサーがONしない",
  steps: [
    {
      title: "どのセンサーがONしないのか確認する",
      description: "まず、どのセンサーで異常が出ているのかを明確にする。",
      checkPoint: "HMIの異常画面、I/O表、図面、実機のセンサー名板",
      okExample: "対象センサー名と入力番号が特定できている",
      ngExample: "何のセンサーが原因か分からないまま確認を始めている",
      image: "",
      video: ""
    },
    {
      title: "HMI表示なのか、PLC入力なのか、現物側なのかを切り分ける",
      description: "HMI上でOFFなのか、PLC入力自体がOFFなのか、センサー本体が反応していないのかを分ける。",
      checkPoint: "HMIランプ表示、PLC入力モニタ、センサーLED",
      okExample: "HMI、PLC入力、センサーLEDのどこで信号が止まっているか分かっている",
      ngExample: "HMI表示だけを見てセンサー不良と判断している",
      image: "",
      video: ""
    },
    {
      title: "センサー本体のLEDが点灯しているか確認する",
      description: "検出物を近づけたときに、センサー本体の表示LEDが点灯するか確認する。",
      checkPoint: "センサー本体の表示LED",
      okExample: "検出物を近づけるとセンサーLEDが点灯する",
      ngExample: "検出物を近づけてもLEDが点灯しない",
      image: "",
      video: ""
    },
    {
      title: "検出物がセンサーの検出範囲に入っているか確認する",
      description: "ワーク、ドグ、シリンダー、治具などがセンサーの検出位置まで来ているか確認する。",
      checkPoint: "センサー先端、ワーク位置、ドグ位置、シリンダー端位置",
      okExample: "検出物がセンサーの検出範囲に入っている",
      ngExample: "検出物が手前で止まっている、またはセンサー位置から外れている",
      image: "",
      video: ""
    },
    {
      title: "センサーの位置、角度、距離、締付状態を確認する",
      description: "センサーの取付位置や角度がずれていないか、締付が緩んでいないか確認する。",
      checkPoint: "センサーブラケット、取付ナット、検出距離",
      okExample: "センサーが正しい位置で固定されている",
      ngExample: "センサーがずれている、角度が悪い、ナットが緩んでいる",
      image: "",
      video: ""
    },
    {
      title: "PLC入力モニタで該当入力がONしているか確認する",
      description: "センサーLEDだけで判断せず、PLC側の入力がONしているか確認する。",
      checkPoint: "PLCソフトの入力モニタ、I/Oモニタ画面",
      okExample: "センサー検出時にPLC入力もONする",
      ngExample: "センサーLEDは点灯するがPLC入力がONしない",
      image: "",
      video: ""
    },
    {
      title: "端子台、コネクタ、ケーブルの接続状態を確認する",
      description: "センサーからPLC入力までの配線経路で、抜け、緩み、断線、誤配線がないか確認する。",
      checkPoint: "センサーコネクタ、中継端子台、制御盤内端子台、PLC入力ユニット",
      okExample: "配線経路に抜けや誤配線がない",
      ngExample: "コネクタ未接続、端子台の入れ間違い、ケーブル断線がある",
      image: "",
      video: ""
    },
    {
      title: "図面の入力アドレスとPLC側の割付が一致しているか確認する",
      description: "図面の入力番号、端子台番号、PLC入力アドレスが一致しているか確認する。",
      checkPoint: "電気図面、I/O表、PLC割付、端子台",
      okExample: "図面、実配線、PLC入力番号が一致している",
      ngExample: "図面ではX10だが、実際はX11に入っている",
      image: "",
      video: ""
    },
    {
      title: "ラダーで参照しているデバイスが正しいか確認する",
      description: "PLC入力がONしていても、ラダー側で違うデバイスを見ていると動作しない。",
      checkPoint: "ラダー回路、対象ステップ、インターロック条件",
      okExample: "実入力とラダー参照デバイスが一致している",
      ngExample: "入力はONしているが、ラダーでは別の入力を参照している",
      image: "",
      video: ""
    },
    {
      title: "HMI表示の参照先が正しいか確認する",
      description: "PLC側ではONしているのにHMIだけ表示されない場合、HMIの参照デバイスが違う可能性がある。",
      checkPoint: "HMI画面設定、ランプ部品の参照デバイス",
      okExample: "HMIランプの参照先がPLCの正しいデバイスになっている",
      ngExample: "HMIだけ違うデバイスを見ている",
      image: "",
      video: ""
    },
    {
      title: "安全条件やインターロックで見えていないだけではないか確認する",
      description: "センサー自体は正常でも、安全条件や前後条件が成立していないため、動作しない場合がある。",
      checkPoint: "安全回路、運転準備、非常停止、扉スイッチ、前後工程条件、ラダーのインターロック",
      okExample: "センサー入力と動作条件の両方を確認できている",
      ngExample: "センサーだけを見て、前後条件や安全条件を確認していない",
      image: "",
      video: ""
    }
  ],
  causes: [
    "センサー位置ズレ",
    "検出距離不足",
    "ワーク位置ズレ",
    "ドグ位置ズレ",
    "センサー電源未供給",
    "センサー本体の故障",
    "コネクタ未接続",
    "端子台配線ミス",
    "ケーブル断線",
    "入力COM違い",
    "PNP/NPNの考え違い",
    "PLC入力番号の割付ミス",
    "ラダー参照デバイス違い",
    "HMI表示の参照先違い",
    "安全条件やインターロック未成立"
  ],
  cautions: [
    "HMIのランプだけで判断しない",
    "センサーLEDとPLC入力は別物として確認する",
    "現物、配線、PLC、ラダー、HMIの順で追う",
    "いきなりプログラムを疑わない",
    "調整した場所は記録する",
    "どこまで信号が来ているかで区切って確認する",
    "センサーがONしないのか、ONしているのに動作しないのかを分ける",
    "図面、実配線、PLC割付、HMI表示を混同しない"
  ]
};

// 通常手順。工程ごとに追加していけば、画面側はそのまま拡張できます。
const normalStepLists = {
  io_check: [
    {
      title: "入力信号の確認をする",
      summary: "実機のセンサー・スイッチを動かし、PLC入力でON/OFFを確認する",
      overview: "センサー、リミットスイッチ、押しボタンなどの入力信号が、実機からPLC入力まで正しく入っているか確認する。",
      recommendedPeople: "2人",
      purpose: "入力機器の配線ミス、入力番号違い、センサー反応不良を早い段階で発見する。",
      method: [
        "I/O図面にチェックしながら確認する",
        "電装屋に配線ミスを確認してもらえるように、確認結果を残す",
        "該当するシリンダ、センサー、スイッチなどを実際に動かす",
        "PLC側で該当入力がON/OFFするか確認する"
      ],
      roles: [
        "実機側担当：実際にセンサーやスイッチを動かす、I/O図面にチェックする",
        "PLC側担当：PLCで入力信号を確認する"
      ],
      checkPoints: [
        "図面の入力番号とPLC入力が一致しているか",
        "センサーLEDとPLC入力が一致しているか",
        "タッチパネル表示がある場合は表示も一致しているか",
        "ON/OFFの反応が逆になっていないか",
        "反応しない入力がないか"
      ],
      records: [
        "確認済みの入力番号",
        "反応しなかった入力",
        "図面と違っていた箇所",
        "配線修正が必要な箇所"
      ],
      cautions: [
        "タッチパネル表示だけで判断しない",
        "必ずPLC入力モニタで確認する",
        "センサーLEDが点灯していても、PLC入力がONしているとは限らない"
      ]
    },
    {
      title: "出力信号の確認をする",
      summary: "PLCから出力を強制ONし、対象機器が正しく動作するか確認する",
      overview: "ランプ、ブザー、ソレノイド、リレーなどの出力機器が、PLC出力から実機まで正しく動作するか確認する。",
      recommendedPeople: "2人",
      purpose: "出力配線ミス、出力番号違い、対象機器の誤動作を早い段階で発見する。",
      method: [
        "I/O図面にチェックしながら確認する",
        "電装屋に配線ミスを確認してもらえるように、確認結果を残す",
        "PLCから対象出力を強制ONする",
        "該当するランプ、ブザー、ソレノイド、リレーなどが動作するか確認する"
      ],
      roles: [
        "PLC側担当：PLCから出力を強制ON/OFFする",
        "実機側担当：対象機器が正しく動作するか確認する"
      ],
      checkPoints: [
        "図面の出力番号と実機の動作が一致しているか",
        "違う機器が動作していないか",
        "出力ON前に、動作しても危険がない状態か",
        "ソレノイド動作時にシリンダーが急に動かないか",
        "ランプ、ブザー、リレーの動作が指示通りか"
      ],
      records: [
        "確認済みの出力番号",
        "動作しなかった出力",
        "違う機器が動いた箇所",
        "配線修正が必要な箇所"
      ],
      cautions: [
        "出力確認は入力確認より危険が高い",
        "強制ON前に、必ず周囲確認を行う",
        "ソレノイドやモーター系は特に注意する",
        "人が装置内にいないことを確認してから出力する"
      ]
    }
  ],
  air_manual: [
    "エア供給前に、周囲に人や干渉物がないか確認する",
    "レギュレータ設定値を確認する",
    "エアをゆっくり投入する",
    "エア漏れ、異音、急な動作がないか確認する",
    "手動操作画面または手動操作スイッチを確認する",
    "シリンダーやアクチュエータを1軸ずつ動作させる",
    "前進端、後退端などのセンサーが正しく入るか確認する",
    "動作方向が指示と合っているか確認する",
    "スピードコントローラで速度を調整する",
    "干渉、引っかかり、配管の突っ張りがないか確認する",
    "手動動作確認結果を記録する"
  ],
  homing: [
    "原点復帰前に、各軸が動作しても安全な位置にあるか確認する",
    "非常停止、扉、安全回路が正常に復帰しているか確認する",
    "原点センサー、リミットセンサーの状態を確認する",
    "原点復帰条件が成立しているか確認する",
    "1軸ずつ原点復帰を実行する",
    "原点復帰方向が正しいか確認する",
    "原点センサー検出後に正しく停止するか確認する",
    "原点復帰完了フラグがONするか確認する",
    "HMI上の原点復帰完了表示とPLC状態が一致するか確認する",
    "原点復帰後の位置ズレや干渉がないか確認する",
    "原点復帰結果を記録する"
  ],
  single_operation: [
    "単動作前に、対象ユニット周辺の安全を確認する",
    "手動操作画面で対象動作を選択する",
    "動作開始条件が成立しているか確認する",
    "1動作ずつ実行する",
    "動作方向、動作順、停止位置を確認する",
    "動作中に干渉や異音がないか確認する",
    "動作完了センサーが正しくONするか確認する",
    "次動作へ進む条件が成立するか確認する",
    "動作後にワーク位置や治具位置が正しいか確認する",
    "単動作確認結果を記録する"
  ]
};

const normalTitles = {
  io_check: "I/Oチェック（2人推奨）"
};

const processDefinitions = [
  ["power_before", "①", "電源投入前確認", false],
  ["first_power", "②", "初回電源投入", false],
  ["device_setup", "③", "PLC・HMI・各機器立ち上げ・通信初期設定", false],
  ["io_check", "④", "I/Oチェック", true],
  ["air_manual", "⑤", "エア投入・手動動作確認", true],
  ["adjustment", "⑥", "調整作業", false],
  ["safety", "⑦", "安全回路・インターロック確認", false],
  ["homing", "⑧", "原点復帰確認", true],
  ["single_operation", "⑨", "単動作確認", true],
  ["auto_operation", "⑩", "自動運転確認", false],
  ["alarm_recovery", "⑪", "異常・復帰確認", false],
  ["model_change", "⑫", "品種切替・パラメータ確認", false],
  ["log_data", "⑬", "ログ・データ確認", false],
  ["continuous", "⑭", "連続運転確認", false],
  ["pre_acceptance", "⑮", "検収前整理", false],
  ["handover", "⑯", "バックアップ・引き渡し", false]
];

function normalizeNormalStep(step, processId, index) {
  const base = typeof step === "string" ? { title: step } : step;
  return {
    id: base.id || `${processId}_normal_${index + 1}`,
    title: base.title || "",
    summary: base.summary || "",
    overview: base.overview || base.summary || "",
    recommendedPeople: base.recommendedPeople || "",
    purpose: base.purpose || "",
    method: base.method || [],
    roles: base.roles || [],
    checkPoints: base.checkPoints || [],
    records: base.records || [],
    cautions: base.cautions || []
  };
}

const debugData = Object.fromEntries(
  processDefinitions.map(([id, number, title, available]) => [id, {
    id,
    number,
    title,
    fullTitle: `${number} ${title}`,
    normalTitle: normalTitles[id] || `${number} ${title} 通常手順`,
    available,
    normalSteps: (normalStepLists[id] || []).map((step, index) => normalizeNormalStep(step, id, index)),
    troubles: available ? { sensor_not_on: sensorNotOnTrouble } : {}
  }])
);

const futureFeatures = [
  "AIによる原因候補の提案",
  "画像・動画つき確認手順",
  "作業ログ保存",
  "報告書出力",
  "社内ナレッジ登録",
  "工程別トラブルパターン追加"
];

const appState = {
  selectedProcessId: "",
  selectedTroubleId: "",
  selectedNormalStepIndex: null,
  reportText: ""
};

const elements = {
  processList: document.querySelector("#processList"),
  selectedProcess: document.querySelector("#selectedProcess"),
  selectionStatus: document.querySelector("#selectionStatus"),
  normalTitle: document.querySelector("#normalTitle"),
  normalArea: document.querySelector("#normalArea"),
  normalStepsContainer: document.querySelector("#normalStepsContainer"),
  normalDetail: document.querySelector("#normalDetail"),
  troubleSelect: document.querySelector("#troubleSelect"),
  equipmentInput: document.querySelector("#equipmentInput"),
  errorInput: document.querySelector("#errorInput"),
  showResultButton: document.querySelector("#showResultButton"),
  clearInputButton: document.querySelector("#clearInputButton"),
  resetButton: document.querySelector("#resetButton"),
  formMessage: document.querySelector("#formMessage"),
  resultArea: document.querySelector("#resultArea"),
  resultSummary: document.querySelector("#resultSummary"),
  stepsContainer: document.querySelector("#stepsContainer"),
  causesContainer: document.querySelector("#causesContainer"),
  cautionsContainer: document.querySelector("#cautionsContainer"),
  reportMemo: document.querySelector("#reportMemo"),
  copyButton: document.querySelector("#copyButton"),
  copyMessage: document.querySelector("#copyMessage"),
  futureList: document.querySelector("#futureList")
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderProcesses() {
  elements.processList.innerHTML = Object.values(debugData).map((process) => `
    <button
      type="button"
      class="process-item ${process.available ? "available" : "unavailable"}"
      data-process-id="${process.id}"
      ${process.available ? "" : "disabled"}
      aria-pressed="false"
    >
      <span class="process-number">${process.number}</span>
      <span class="process-name">${escapeHtml(process.title)}</span>
      <span class="${process.available ? "ready-label" : "wip-label"}">${process.available ? "対応中" : "準備中"}</span>
    </button>
  `).join("");
}

function renderFutureFeatures() {
  elements.futureList.innerHTML = futureFeatures.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("");
}

function toCircledNumber(index) {
  return ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"][index] || String(index + 1);
}

function renderListItems(items) {
  if (!items.length) return `<li>未登録</li>`;
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderNormalSteps(process) {
  elements.normalTitle.textContent = process.normalTitle;
  elements.normalDetail.hidden = true;
  elements.normalDetail.innerHTML = "";
  appState.selectedNormalStepIndex = null;

  if (!process.normalSteps.length) {
    elements.normalStepsContainer.innerHTML = `<p class="empty-note">この工程の通常手順は準備中です。</p>`;
  } else {
    elements.normalStepsContainer.innerHTML = process.normalSteps.map((step, index) => `
      <button type="button" class="normal-step-card" data-normal-index="${index}" aria-expanded="false">
        <span class="normal-step-index">${toCircledNumber(index)}</span>
        <span class="normal-step-text">
          <strong>${escapeHtml(step.title)}</strong>
          <small>${escapeHtml(step.summary)}</small>
        </span>
      </button>
    `).join("");
  }

  elements.normalArea.hidden = false;
}

function renderNormalDetail(index) {
  const process = debugData[appState.selectedProcessId];
  const step = process?.normalSteps[index];
  if (!step) return;

  appState.selectedNormalStepIndex = index;
  document.querySelectorAll(".normal-step-card").forEach((button) => {
    const isSelected = Number(button.dataset.normalIndex) === index;
    button.classList.toggle("selected", isSelected);
    button.setAttribute("aria-expanded", String(isSelected));
  });

  elements.normalDetail.innerHTML = `
    <div class="normal-detail-header">
      <span>${toCircledNumber(index)}</span>
      <div>
        <p class="section-kicker">PROCEDURE DETAIL</p>
        <h4>${escapeHtml(step.title)}</h4>
        <p>${escapeHtml(step.overview)}</p>
      </div>
      ${step.recommendedPeople ? `<strong class="people-badge">推奨人数：${escapeHtml(step.recommendedPeople)}</strong>` : ""}
    </div>

    <div class="normal-detail-grid">
      <section class="normal-detail-block wide">
        <h5>目的</h5>
        <p>${escapeHtml(step.purpose || "未登録")}</p>
      </section>
      <section class="normal-detail-block">
        <h5>確認方法</h5>
        <ul>${renderListItems(step.method)}</ul>
      </section>
      <section class="normal-detail-block">
        <h5>役割</h5>
        <ul>${renderListItems(step.roles)}</ul>
      </section>
      <section class="normal-detail-block">
        <h5>確認ポイント</h5>
        <ul>${renderListItems(step.checkPoints)}</ul>
      </section>
      <section class="normal-detail-block">
        <h5>記録すること</h5>
        <ul>${renderListItems(step.records)}</ul>
      </section>
      <section class="normal-detail-block caution-detail wide">
        <h5>注意点</h5>
        <ul>${renderListItems(step.cautions)}</ul>
      </section>
    </div>
  `;
  elements.normalDetail.hidden = false;
  elements.normalDetail.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function selectProcess(processId) {
  const process = debugData[processId];
  if (!process || !process.available) return;

  appState.selectedProcessId = processId;
  appState.selectedTroubleId = "";
  elements.selectedProcess.textContent = process.fullTitle;
  elements.selectionStatus.textContent = "選択済み";
  elements.selectionStatus.classList.remove("waiting");
  elements.formMessage.textContent = "";

  document.querySelectorAll(".process-item").forEach((button) => {
    const isSelected = button.dataset.processId === processId;
    button.classList.toggle("selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  renderNormalSteps(process);

  const troubleOptions = Object.values(process.troubles)
    .map((trouble) => `<option value="${trouble.id}">${escapeHtml(trouble.title)}</option>`)
    .join("");
  elements.troubleSelect.innerHTML = `<option value="">現象を選択してください</option>${troubleOptions}`;
  elements.troubleSelect.disabled = false;
  elements.showResultButton.disabled = true;
  hideTroubleResults();
}

function getCurrentTrouble() {
  const process = debugData[appState.selectedProcessId];
  return process?.troubles[appState.selectedTroubleId] || null;
}

function renderTroubleSteps(steps) {
  elements.stepsContainer.innerHTML = steps.map((step, index) => `
    <article class="step-card">
      <div class="step-index">STEP<strong>${index + 1}</strong></div>
      <div class="step-content">
        <h4>${escapeHtml(step.title)}</h4>
        <p class="step-description">${escapeHtml(step.description)}</p>
        <div class="detail-grid">
          <div class="detail-item check"><span class="detail-label">見る場所</span>${escapeHtml(step.checkPoint)}</div>
          <div class="detail-item ok"><span class="detail-label">OK例</span>${escapeHtml(step.okExample)}</div>
          <div class="detail-item ng"><span class="detail-label">NG例</span>${escapeHtml(step.ngExample)}</div>
        </div>
        <div class="media-row">
          <span><b>参考画像：</b>${step.image || "未登録"}</span>
          <span><b>参考動画：</b>${step.video || "未登録"}</span>
        </div>
      </div>
    </article>
  `).join("");
}

function buildReport(process, trouble) {
  const equipment = elements.equipmentInput.value.trim() || "（未入力）";
  const error = elements.errorInput.value.trim() || "（未入力）";
  const stepLines = trouble.steps.map((step, index) => `${index + 1}. ${step.title}`).join("\n");
  const causeLines = trouble.causes.map((cause) => `・${cause}`).join("\n");
  const cautionLines = trouble.cautions.map((caution) => `・${caution}`).join("\n");

  return `【工程】
${process.fullTitle}

【現象】
${trouble.title}

【対象機器】
${equipment}

【エラー内容】
${error}

【確認する順番】
${stepLines}

【原因候補】
${causeLines}

【注意点】
${cautionLines}

【次に確認すること】
現物、配線、PLC入力、ラダー、HMIの順で切り分ける。`;
}

function showTroubleResults() {
  const process = debugData[appState.selectedProcessId];
  const trouble = getCurrentTrouble();
  if (!process || !trouble) {
    elements.formMessage.textContent = "工程と現象を選択してください。";
    return;
  }

  renderTroubleSteps(trouble.steps);
  elements.causesContainer.innerHTML = trouble.causes.map((cause) => `<span class="cause-tag">${escapeHtml(cause)}</span>`).join("");
  elements.cautionsContainer.innerHTML = trouble.cautions.map((caution) => `<li>${escapeHtml(caution)}</li>`).join("");
  appState.reportText = buildReport(process, trouble);
  elements.reportMemo.textContent = appState.reportText;
  elements.resultSummary.textContent = `${process.fullTitle} ・ ${trouble.title}`;
  elements.resultArea.hidden = false;
  elements.copyMessage.textContent = "";
  elements.formMessage.textContent = "";
  elements.resultArea.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideTroubleResults() {
  elements.resultArea.hidden = true;
  elements.stepsContainer.innerHTML = "";
  elements.causesContainer.innerHTML = "";
  elements.cautionsContainer.innerHTML = "";
  elements.reportMemo.textContent = "";
  elements.copyMessage.textContent = "";
  appState.reportText = "";
}

function clearInputs() {
  elements.equipmentInput.value = "";
  elements.errorInput.value = "";
  elements.formMessage.textContent = "";
  if (!elements.resultArea.hidden) showTroubleResults();
  elements.equipmentInput.focus();
}

function resetApp() {
  appState.selectedProcessId = "";
  appState.selectedTroubleId = "";
  appState.selectedNormalStepIndex = null;
  elements.selectedProcess.textContent = "工程を選択してください";
  elements.selectionStatus.textContent = "未選択";
  elements.selectionStatus.classList.add("waiting");
  elements.normalArea.hidden = true;
  elements.normalStepsContainer.innerHTML = "";
  elements.normalDetail.hidden = true;
  elements.normalDetail.innerHTML = "";
  elements.troubleSelect.innerHTML = '<option value="">先に工程を選択してください</option>';
  elements.troubleSelect.disabled = true;
  elements.showResultButton.disabled = true;
  elements.equipmentInput.value = "";
  elements.errorInput.value = "";
  elements.formMessage.textContent = "";
  document.querySelectorAll(".process-item").forEach((button) => {
    button.classList.remove("selected");
    button.setAttribute("aria-pressed", "false");
  });
  hideTroubleResults();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function copyReport() {
  if (!appState.reportText) return;
  try {
    await navigator.clipboard.writeText(appState.reportText);
  } catch (error) {
    // file:// などClipboard APIが使えない環境向けのフォールバックです。
    const temp = document.createElement("textarea");
    temp.value = appState.reportText;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();
    const copied = document.execCommand("copy");
    temp.remove();
    if (!copied) {
      elements.copyMessage.textContent = "コピーできませんでした";
      return;
    }
  }

  elements.copyMessage.textContent = "コピーしました";
  window.setTimeout(() => { elements.copyMessage.textContent = ""; }, 2500);
}

elements.processList.addEventListener("click", (event) => {
  const button = event.target.closest(".process-item.available");
  if (button) selectProcess(button.dataset.processId);
});

elements.normalStepsContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".normal-step-card");
  if (button) renderNormalDetail(Number(button.dataset.normalIndex));
});

elements.troubleSelect.addEventListener("change", (event) => {
  appState.selectedTroubleId = event.target.value;
  elements.showResultButton.disabled = !appState.selectedTroubleId;
  elements.formMessage.textContent = "";
  hideTroubleResults();
});

elements.showResultButton.addEventListener("click", showTroubleResults);
elements.clearInputButton.addEventListener("click", clearInputs);
elements.resetButton.addEventListener("click", resetApp);
elements.copyButton.addEventListener("click", copyReport);

renderProcesses();
renderFutureFeatures();
