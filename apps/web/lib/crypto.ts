import { createCipheriv, createDecipheriv, randomBytes, createHash } from "crypto";

interface EncryptedPayload {
  scheme: "aes256gcm_v1";
  iv: string;
  tag: string;
  ciphertext: string;
}

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

function getMasterKey(): Buffer {
  const key = process.env.KADEROS_MASTER_KEY;
  if (!key) {
    throw new Error("KADEROS_MASTER_KEY environment variable is required");
  }
  if (key.length === 64) return Buffer.from(key, "hex");
  return Buffer.from(key, "base64");
}

export function encrypt(plaintext: string): EncryptedPayload {
  const masterKey = getMasterKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, masterKey, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    scheme: "aes256gcm_v1",
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
  };
}

export function decrypt(payload: EncryptedPayload): string {
  if (payload.scheme !== "aes256gcm_v1") {
    throw new Error(`Unknown encryption scheme: ${payload.scheme}`);
  }
  const masterKey = getMasterKey();
  const iv = Buffer.from(payload.iv, "base64");
  const tag = Buffer.from(payload.tag, "base64");
  const ciphertext = Buffer.from(payload.ciphertext, "base64");
  const decipher = createDecipheriv(ALGORITHM, masterKey, iv);
  decipher.setAuthTag(tag);
  const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return plain.toString("utf8");
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}
