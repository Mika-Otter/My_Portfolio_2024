import React from 'react';
import s from "./SecretsFound.module.scss";

export default function SecretsFound({ foundSecrets}) {
    return (
        <div className={s.secrets}>
            <span>{foundSecrets} OF 4 SECRETS</span>
        </div>
    );
}